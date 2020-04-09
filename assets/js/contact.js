if(window.localStorage.getItem('state')==null){
    openSettings();
}

window.addEventListener('load',()=>{
    requestJSON("https://lkounivCovid19.in/api/resources.json")
                .then((data)=>{
                    let govt=``,vendor=``,ngo=``, pushContent;
                    data.forEach((resource)=>{
                        let {type,category,city,description,organisation,phonenumber,stateName} = resource;
                        if(stateName!=null && stateName==state){
                            phonenumber = phonenumber.split(' ')[0];
                            pushContent = `
                            <li>
                                <a href="tel:${phonenumber}" rel="noopener noreferrer" class="contact">
                                    <div class="contact-heading">
                                    <h5>${organisation}</h5>
                                        <p>${category} , ${city}</p>
                                    </div>
                                    <div class="contact-content">
                                        <p>${description}</p>
                                        <p>${phonenumber}</p>
                                    </div>
                                </a>
                            </li>
                            `

                            switch(type){
                                case "govt" : {
                                    govt += pushContent;
                                    break;
                                };
                                case "ngo" : {
                                    ngo += pushContent;
                                    break;
                                };
                                case "vendor" : {
                                    vendor += pushContent;
                                    break;
                                }
                            }
                        }
                    })
                    pushDatatoDOM('govt-list',govt);
                    pushDatatoDOM('ngo-list',ngo);
                    pushDatatoDOM('vendor-list',vendor);
                });
},false)