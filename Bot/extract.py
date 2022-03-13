import fitz
import io
from PIL import Image
file = "/home/shirdi/dass_project/DASS2K22-Team-36/src/FormBotsAdmin-main/src/HIT 3 TO 4 Men's UG & NW Planogram.pdf"
pdf_file = fitz.open(file)

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
        image.save(open(f"image{page_index+1}_{image_index}.{image_ext}", "wb"))
        
