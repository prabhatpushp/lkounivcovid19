window.addEventListener('load',()=>{
    requestJSON("https://lkounivCovid19.in/api/notices.json")
                .then((data)=>{
                    let pushContent = ``;
                    data.forEach((notice)=>{
                        console.log(notice)
                        pushContent += `
                        <li>
                            <a href="${notice.link?notice.link:"#"}" target="_blank" rel="noopener noreferrer" class="notice">
                                <div class="notice-heading">
                                    <h5>${notice.source?notice.source:""}</h5>
                                    <span>${notice.date?notice.date:""}</span>
                                </div>
                                <div class="notice-content"><p>${notice.content?notice.content:''}</p></div>
                            </a>
                        </li>
                        `
                    });
                    pushDatatoDOM("notices",pushContent);
                });
},false)