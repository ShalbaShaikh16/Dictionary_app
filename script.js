const form=document.querySelector('form');//to copy=shift+alt+downarrow
const Result=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
e.preventDefault();
getWordInfo(form.elements[0].value);
})
const getWordInfo=async(word)=>{
    try{
    Result.innerHTML="Fetching Data";
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await  response.json();
    let definitions=data[0].meanings[0].definitions[0];

    Result.innerHTML=`
        <h2><strong>Word:</strong>${data[0].word}</h2>
        <p class="pofSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong>${definitions.definition ===undefined ? "Not Found":definitions.definition }</p>
        <p><strong>Example:</strong>${definitions.example ===undefined ? "Not Found":definitions.example}</p>
        <p><strong>Antonyms:</strong></p>
        
        `;
        
        //Fetching Antonyms
        if(definitions.antonyms.length==0){
            Result.innerHTML +=`<span>Not Found</span>`
        }
        else{
        for(let i=0; i<definitions.antonyms.length;i++){
            Result.innerHTML +=`<li>${definitions.antonyms[i]}</li>`
        }
        
    }

    //Fetching Synonyms
    Result.innerHTML += `<p><strong>Synonyms:</strong></p>`;
    if (!definitions.synonyms || definitions.synonyms.length === 0) {
      Result.innerHTML += `<span>Not Found</span>`;
    } else {
      Result.innerHTML += `<ul>`;
      definitions.synonyms.forEach((synonym) => {
        Result.innerHTML += `<li>${synonym}</li>`;
      });
      Result.innerHTML += `</ul>`;
    }
    //Read More Btn

    
    Result.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`
}
catch(error){
    Result.innerHTML=`<p>Word Not Found </p>`;
}
    console.log(data)
}