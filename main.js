import { v4  } from 'https://jspm.dev/uuid';
import { Search } from "./js/api.js";
import { controlBtn, elements, getFromLocal, setLocalStorage } from "./js/helpers.js";
import { Recipe } from "./js/recipe.js";
import { renderBasketItems, renderLoader, renderResult } from "./js/ui.js";

const recipe = new Recipe();

async function handleSubmit(e) {
  e.preventDefault();
  console.log(e);
  // aratılan kelime
  const query = elements.seacrhInput.value;
  //   inputun içi boşsa bildirim göndersin
  if (query == "") {
    alert("Inputun içerisi boş!!");
  } else {
  }
  // inputun içine herhangi bir şey yazarsak çalışır
  if (query) {
    // search sınıfının bir örneğini oluşturur
    const search = new Search(query);
    // istek atmaya başlamadan önce loaderı çalıştırmalıyız ve ekrana aktarmalıyız
    renderLoader(elements.resultsList);
    // istek atma
    try {
      await search.getResults();
      // gelen veriyi ekrana renderlayan fonksiyon
      renderResult(search.result);
    } catch (error) {
      console.log(error);
    }
  }
}
elements.form.addEventListener("submit", handleSubmit);
// tarif detaylarını alma
const controlRecipe = async () => {
  const id = location.hash.replace("#", "");
  //   console.log(id);
  if (id) {
    try {
      // tarif bilgilerini al
      await recipe.getRecipe(id);
      // ekrana tarfi arayüzünü aktarma
      recipe.renderRecipe(recipe.info);
    } catch (error) {
      console.log(error);
    }
  }
};
//* tekrar eden işlemlerde döngü kullanabiliriz
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

let basket = getFromLocal('basket') || [];

document.addEventListener('DOMContentLoaded', ()=> {
  renderBasketItems(basket);

  controlBtn(basket);
});

const handleClick = (e) => {
  if (e.target.id === 'add-to-basket') { 
  
    recipe.ingredients.forEach((title) => {
      const newItem = {
        id:v4(),
        title,
      };
      basket.push(newItem);
    });

    setLocalStorage('basket', basket);
    renderBasketItems(basket);
    controlBtn(basket);
  }
  if (e.target.id === 'like-btn'){
    recipe.controlLike();
  }

};

elements.recipeArea.addEventListener('click', handleClick);

elements.basketList.addEventListener('click', deleteItem);

function deleteItem (e){
  if(e.target.id === 'delete-item'){
    const parent = e.target.parentElement;
    basket = basket.filter((i) => i.id !== parent.dataset.id);
    setLocalStorage('basket', basket);
    parent.remove();
    
    controlBtn(basket);
  }
}

elements.clearBtn.addEventListener('click', handleClear);

function handleClear(){
  const res = confirm('Sepet silinecek emin misiniz?')
  if(res){
    setLocalStorage('basket', null);
    basket = [];
    controlBtn(basket);
    elements.basketList.innerHTML = '';
  }
}
