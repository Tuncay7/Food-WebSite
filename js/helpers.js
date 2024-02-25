export const elements ={ 
    form: document.querySelector('form'),
    seacrhInput: document.querySelector('form input'),
    resultsList: document.querySelector('.results'),
    recipeArea: document.querySelector(".recipe"),
    likeList:document.querySelector('.list'),
    basketList:document.querySelector('.shopping ul'),
    clearBtn:document.querySelector('#clear'),
};
export const setLocalStorage = (key, data) =>{
  const strData = JSON.stringify(data);
  localStorage.setItem(key, strData);
};
export const getFromLocal = (key) =>{
   const strData = localStorage.getItem(key);
   return JSON.parse(strData);
};

export const controlBtn = (basket) =>{
    if(basket.length > 0){
        elements.clearBtn.computedStyleMap.display = 'flex';

    }else{
        elements.clearBtn.computedStyleMap.display = 'none';
    }
    
};