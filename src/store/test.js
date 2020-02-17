// Это наш инпут
// <input type="file" id="input" multiple onchange="handleFiles">


var imagesArr = [], // Массив для хранения всех фоток
    imagesSrc = [], // Массиб для хранения временного url фоток
    addState  = {// Это объект с характеристиками новости допустим
        imagesArr = [], // Массив для хранения всех фоток
        imagesSrc = [], // Массиб для хранения временного url фоток
    }; 

/**
 * {event} ну это понятно))
 */
function handleFiles(event) {

    const file = [];

    for (let i = 0; i < event.target.files.length; i++) {
        file.push(event.target.files[i]);
    }

    console.log(file);

    for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();

        reader.onload = e => {
            imageSrc.push(reader.result);
            
            console.log('this.imageSrc');
            console.log(imageSrc);
            console.log(e.loaded, e.total);
        };

        reader.readAsDataURL(file[i]);


        imageArr.push(file[i]);
        file[i].id = imageArr.length;

        addState.images = imageArr;

        console.log(imageArr);
    }

    CreateAdd(addState);
}


/**
 * Функция создания новости // или как в моем случае товара
 * 
 */
function CreateAdd ( payload ) {
    const images = payload.images;
}