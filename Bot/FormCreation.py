import json
from operator import sub
import flask
from flask import Flask,redirect, url_for, request,render_template,send_file,jsonify
import werkzeug
from werkzeug.utils import secure_filename
from flask import get_flashed_messages
from flask import flash
from flask import Flask, Response
from flask_cors import CORS,cross_origin
from flask import send_from_directory
import io
import fitz
import re
from PIL import ImageChops, Image
import numpy as np
from PIL import ImageChops, Image
import matplotlib.pyplot as plt 
import numpy as np
import pathlib
import os

# function to return the file extension



PORT=5000
app=Flask(__name__)
app.secret_key = 'development key'  
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app,support_credentials=True)

def extract_images():
    images_list=[]
    pdf_file = fitz.open("trial.pdf")

    for page_index in range(len(pdf_file)):

        page = pdf_file[page_index]
        image_list = page.getImageList()

        if image_list:
            print(f"[+] Found a total of {len(image_list)} images in page {page_index}")
    
        for image_index, img in enumerate(page.getImageList(), start=1):
            xref = img[0]
            base_image = pdf_file.extractImage(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            image = Image.open(io.BytesIO(image_bytes))
            image.save(open(f"frontend/src/components/uploaded_images/temp/image{page_index+1}_{image_index}.{image_ext}", "wb"))
            images_list.append(f"image{page_index+1}_{image_index}.{image_ext}")
    return images_list


def checksimilarity(original,submitted):
    actual_error = 0
    im1 = Image.open(original)
    x = np.array(im1.histogram())

    im2 = Image.open(submitted)
    y = np.array(im2.histogram())

    try:
        if len(x) == len(y):
            error = np.sqrt(((x - y) ** 2).mean())
            error = str(error)[:2]
            actual_error = float(100) - float(error)
        diff = ImageChops.difference(im1, im2).getbbox()
        if diff:
            print("Not Duplicate Image")
            return('Matching Images In percentage: ', actual_error,'\t%' )
            f = plt.figure()
            text_lable = str("Matching Images Percentage" + str(actual_error)+"%")
            plt.suptitle(text_lable)
            f.add_subplot(1,2, 1)
            plt.imshow(im1)
            f.add_subplot(1,2, 2)
            plt.imshow(im2)
            plt.show(block=True)
        else:
            print("Duplicate Image")
            return('Matching Images In percentage: ', actual_error,'%' )
            f = plt.figure()
            text_lable = str("Matching Images Percentage" + str(actual_error)+"%")
            plt.suptitle(text_lable)
            f.add_subplot(1,2, 1)
            plt.imshow(im1)
            f.add_subplot(1,2, 2)
            plt.imshow(im2)
            plt.show(block=True)
    
    except ValueError as identifier:
        # f = plt.figure()
        return ("Matching Images Percentage " + str(actual_error)+"%")
        plt.suptitle(text_lable)
        f.add_subplot(1,2, 1)
        plt.imshow(im1)
        f.add_subplot(1,2, 2)
        plt.imshow(im2)
        plt.show(block=True)
        print('identifier: ', identifier)


@app.after_request
def after_request(response):
    
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
    
@app.route("/FormUpload",methods=["POST"])
@cross_origin(supports_credentials=True,origin='*')
def FormUpload():
    file=request.files["myfile"]
    file.save(secure_filename("trial.pdf"))   
    images=extract_images()
    print(images)
    return jsonify(images)
    print(file)
    print(file.filename,"***********************************************")
    with fitz.open("trial.pdf") as doc:
        text = ""
        for page in doc:
            text += page.getText()
    original="Bot\original.jpeg"
     
    result=checksimilarity(original,file.filename)
    return str(result)


@app.route("/formsubmit",methods=["POST"])
@cross_origin(supports_credentials=True,origin='*')
def formsubmit():
    result=[]
    for i in request.files:
        print(i,request.files[i].filename)
        request.files[i].save(secure_filename("uploaded_temp_{}".format(i)))
        uploaded="uploaded_temp_{}".format(i)
        original="frontend/src/components/uploaded_images/temp/"+i
        res=checksimilarity(original,uploaded)
        result.append(res)
    # print(result)
    return jsonify(result)

if __name__=="__main__":
    app.run(debug=True)


