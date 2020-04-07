
let tipsArray = ["Don't hoard groceries and essentials. Please ensure that people who are in need don't face a shortage because of you!",
"Be compassionate! Help those in need like the elderly and poor. They are facing a crisis which we can't even imagine!",
"Be considerate. While buying essentials remember that you need to share with 130 crore fellow citizens!",
"Going out to buy essentials? Social Distancing is KEY! Maintain at least 2 metres distance between each other in the line.",
"Plan ahead! Take a minute and check how much supplies you have at home. Planning lets you buy exactly what you need.",
"Plan and calculate your essential needs for the next three weeks",
"Help out the elderly by bringing them their groceries and other essentials.",
"Help out your employees and domestic workers by not cutting their salaries. Show the true Indian spirit!",
"Lockdown means LOCKDOWN! Avoid going out unless absolutely necessary. Stay safe!",
"Panic mode : OFF! ❌ ESSENTIALS ARE ON! ✔️",
"Your essential needs will be taken care of by the government in a timely manner. Please do not hoard.",
"Be a true Indian. Show compassion, Be considerate,Help those in need. We will get through this!",
"If you have symptoms and suspect you have coronavirus - reach out to your doctor or call state helplines. 📞 Get help.",
"Stand against FAKE news and illegit WhatsApp forwards! Do NOT ❌ forward a message until you verify the content it contains.",
"If you have any medical queries, reach out to your state helpline, district administration or trusted doctors!",
"Wash your hands with soap and water often, especially after a grociery run. Keep the virus at bay.",
"There is no evidence that hot weather will stop the virus! You can! Stay home, stay safe.",
"Help the medical fraternity by staying at home!",
"Avoid going out during the lockdown. Help break the chain of spread.",
"Call up your loved ones during the lockdown, support each other through these times.",
"The virus does not discriminate. Why do you? DO NOT DISCRIMINATE. We are all Indians!",
"Our brothers from the North-East are just as Indian as you! Help everyone during this crisis ❤️",
"Get in touch with your local NGO's and district administration to volunteer for this cause.",
"This will pass too. Enjoy your time at home and spend quality time with your family! Things will be normal soon.",
"#BreakTheChain of unverified WhatsApp forwards which spread wrong information! Do not forward unless you verify it."];
let tips = document.getElementById('tips');
setInterval(()=>{
tips.innerText = tipsArray[Math.floor(Math.random()*tipsArray.length)];
},10000)




window.addEventListener('load',()=>{
    requestJSON("https://lkounivcovid19.in/api/latestnotice.json")
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