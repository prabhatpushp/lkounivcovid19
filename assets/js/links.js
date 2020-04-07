window.addEventListener('load',()=>{
    requestJSON("http://127.0.0.1:5500/api/notices.json")
                .then((data)=>{
                    let pushContent = ``;
                    data.forEach((notice)=>{
                        console.log(notice)
                        pushContent += `
                        <li>
                            <a href="${notice.link?notice.link:"#"}" class="notice">
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