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
import rake_nltk
from rake_nltk import Rake
from nltk.corpus import wordnet
import nltk
nltk.download("stopwords")
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('averaged_perceptron_tagger')
rake_nltk_var = Rake()


standard_commands={
    "upload":"upload.v.01",
    "choice":"choose.v.02",
    "enter":"enter.v.08",
    "fill":"fill.v.02"
}

command_field={
    "upload":"file",
    "choice":"radio",
    "enter":"textbox",
    "fill":"textbox"
}

PORT=5000
app=Flask(__name__)
app.secret_key = 'development key'  
app.config['CORS_HEADERS'] = 'Content-Type'

CORS(app,support_credentials=True)
def replace_comma_with_context(text):
  match=re.findall("^([\w\s]*)[\s]+([\w]*),",text)
  new_text=text
  if(len(match)>0):
    new_text=text.replace(","," . "+match[0][0]+" ")
  return new_text

def extract_guideline_command(word):
    index=-1;max_similarity=0
    for command in standard_commands:
        synsets_arr=wordnet.synsets(word,pos="v")
        if(len(synsets_arr)>0):
            similarity=map(lambda x: wordnet.synset( standard_commands[command]).wup_similarity(x) ,synsets_arr )
            ma=max(list(similarity))
            if(ma>max_similarity and ma>0.6):
                max_similarity=ma
                index=command
    if(index!=-1):
        return index
    else:
        return None


def extract_fields(text):
    form_fields=[]
    for i in range(len(text)):
        text[i]=replace_comma_with_context(text[i])
    

    text=" . ".join(text)
    text=text.lower()
    text=text.split(".");
    for i in range(len(text)):
        rake_nltk_var.extract_keywords_from_text(text[i])
        keyword_extracted = rake_nltk_var.get_ranked_phrases()
        keywords=" ".join(keyword_extracted).split()
        for word in text[i].split():
            if(word in keywords):
                command=word
                break
        field=extract_guideline_command(command)
        if(field!=None and text[i]!=""):
            form_fields.append([text[i],command_field[field]])
    return form_fields



@app.after_request
def after_request(response):
    
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response
    
@app.route("/FormUpload",methods=["POST"])
@cross_origin(supports_credentials=True,origin='*')
def FormUpload():
    file=request.files["myfile"]
    file.save(secure_filename("./trial.pdf"))
    # print(file)
    with fitz.open("trial.pdf") as doc:
        text = ""
        for page in doc:
            text += page.getText()
    text=text.split("\n")
    # print(text)
    commands=[] 
    for i in range(len(text)):
        if(len(text[i])>0):
            if(text[i][0]=="_" and len(text[i])>1):
                text[i]=text[i][1:]
                commands.append(text[i])
    result=extract_fields(commands)
    print(result)
    return jsonify(result)

if __name__=="__main__":
    app.run(debug=True)