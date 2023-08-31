const accessKey ='faP4B196W8rk-Oh9KvpnNh-Tl04zxyJ_pHAdYHfalFE'


const formDiv = document.querySelector('#formDiv');
const searchResults = document.querySelector('#searchResults');
const searchResult = document.querySelector('#searchResult');
const formEl = document.querySelector('form');
const searchInput = document.querySelector('#searchInput');
const showMoreBtn = document.querySelector('#showMoreBtn');
const resultMsg = document.querySelector('#resultMsg');
const resultInput = document.querySelector('#resultInput');

let inputData = "";
let page =1;
const searchImages =async()=>{
 
    inputData = searchInput.value;
    const res = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`);
    const data = await res.json();
    if(page === 1)
    {
        searchResults.innerHTML="";
    }
    page ++

    const results = data.results;
    
    results.map((result)=>{
        const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('searchResult');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt= result.alt_description
    image.classList.add('imageStyle');
    const link = document.createElement('a');
    link.href = result.links.html
    link.innerText = result.alt_description
    link.target = '_blank';
    link.classList.add('linkStyle')

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(link);
    searchResults.appendChild(imageWrapper);
    })
    if(page>1)
    {
        showMoreBtn.style.display = 'block';
        resultMsg.style.display='block';
        resultInput.innerText=`${inputData}`
        
    }


}

formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(searchInput.value =="")
    {
        alert('Please Enter the value!')
    }
    else{
        formDiv.classList.remove('beforeFormDiv')
        formDiv.classList.add('afterFormDiv');
        formDiv.classList.add('anime');
        searchResults.style.display='grid';
        document.body.style.background= 'white'
        searchInput.style.background = '#dfcfbb';
        document.querySelector('#mainHeading').style.color = '#726c64';
        page = 1
        searchImages();
    }
})

showMoreBtn.addEventListener('click',()=>{
    searchImages();
})