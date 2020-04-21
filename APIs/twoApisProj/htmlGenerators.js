let Html = {
     createButton(btnObj){
        let btn = document.createElement('button');
        btn.innerText = btnObj.text;
        btn.onclick = btnObj.click;
        return btn;
    },

     createDivElement(divObj){
        let div = document.createElement('div');
        div.className = divObj.class;
        if(divObj.id != undefined && document.getElementById(divObj.id) == null){
            div.id = divObj.id;
        }
        return div;

    },

//create a heading object with a given text input, size, and id
 createHeading(headingObj) {


    headingObj.size = headingObj.size < 0 ? 0 : headingObj.size;
    headingObj.size = headingObj.size > 5 ? 5: headingObj.size;

    let head = document.createElement(`h${parseInt(headingObj.size)}`);
    
    head.innerText =  typeof headingObj.text  == 'string' ? headingObj.text : 'no text';

    if(headingObj.id != undefined && document.getElementById(headingObj.id) == null){
        head.id = headingObj.id;
    }


    return head;
},
//create an image object with a given width, hieght,src, alt and id
 createImageElement (imgObj) {
    let img = document.createElement('img');
    img.src = imgObj.src;
    img.ondblclick = imgObj.click;
    img.alt = img.alt == undefined ? imgObj.alt : "image is undefined";
    img.width = imgObj.width == undefined ? imgObj.width : 100;
    img.height = imgObj.height == undefined ? imgObj.height : 200;
    img.className = imgObj.className;
    if(imgObj.Id != undefined && document.getElementById(imgObj.Id) == null){
        img.id = imgObj.Id;
    }
    return img;
},

 createLinkElement (linkObj) {
    let a = document.createElement('a');
    let link = document.createTextNode(`${linkObj.text}'s IMBD Link`);
    if(linkObj.newTab){
     a.target = '_blank';
    }
    a.href = linkObj.href;

    if(linkObj.Id != undefined && document.getElementById(linkObj.Id) == null){
        link.id = linkObj.Id;
    }

    a.appendChild(link);
    return a;
},

 createButton(btnObj){
    let btn = document.createElement('button');
    btn.innerText = btnObj.text;
    btn.onclick = btnObj.click;
    return btn;
},

//select elements
 createSelectElement(selectObj) {
    let select = document.createElement('select');
    select.id = selectObj.id;
    select.className = selectObj.className;
    let defaultOption = document.createElement('option');
    defaultOption.innerText = selectObj.default != undefined ? selectObj.default: "Select option";

    select.appendChild(defaultOption);

    for(let i = 0; i < selectObj.array.length; i++){
        let option = document.createElement('option');
        option.innerText = selectObj.array[i];
        option.value = selectObj.array[i];
        select.appendChild(option);
    };

    return select;
}


}

export default Html;