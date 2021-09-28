const { auth, config } = require('./assets/js/utils.js')
const dataDirectory = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME)

document.querySelector(".uzurionAppGenHeader").style.display = "block"

document.querySelector(".login-btn").addEventListener("click", () => {
    if (document.querySelector(".pseudo").value == ""){
        document.querySelector(".uzurion-mail").innerHTML = "Entrez votre adresse email / nom d'utilisateur"
        return;
    } else if (document.querySelector(".password").value == ""){
        document.querySelector(".uzurion-password").innerHTML = "Entrez votre mot de passe"
        return;
    }

    document.querySelector(".login-btn").disabled = true
    document.querySelector(".pseudo").disabled = true
    document.querySelector(".password").disabled = true
    document.querySelector(".uzurion-mail").innerHTML = "&nbsp;"
    document.querySelector(".uzurion-password").innerHTML = "&nbsp;"
    document.querySelector(".info-login").style.color = "white";
    document.querySelector(".info-login").innerHTML = "Connexion en cours..."
    document.querySelector(".info-login").style.display = "block"
    auth.loginMojang(document.querySelector(".pseudo").value, document.querySelector(".password").value).then(user => {
        config.config().then(res => {
            if(document.querySelector(".loginRemember").checked == true){
                const file = require(`${dataDirectory}/${res.dataDirectory}/config.json`);
                file.Login.UserConnect = "Mojang"
                file.Login.Account = {"Mojang":{"User": user}} 
                fs.writeFileSync(`${dataDirectory}/${res.dataDirectory}/config.json`, JSON.stringify(file, true, 4), 'UTF-8')
            }
        })
        document.querySelector(".user-head").src = `https://mc-heads.net/avatar/${user.name}/100/nohelm.png`
        changePanel("login", "home")
    }).catch (err => {
        document.querySelector(".login-btn").disabled = false
        document.querySelector(".pseudo").disabled = false
        document.querySelector(".password").disabled = false
        document.querySelector(".info-login").innerHTML = "Adresse E-mail ou mot de passe invalide"
        document.querySelector(".info-login").style.color = "red";
        document.querySelector(".info-login").style.display = "block"
    })
})

document.querySelector(".loginSpanDim").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/password/forgot")
})

document.querySelector(".store").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/store/minecraft-java-edition")
})

document.querySelector(".store-mi").addEventListener("click", () => {
    nw.Shell.openExternal("https://www.minecraft.net/store/minecraft-java-edition")
})


document.addEventListener('keydown', function (e) {
    if(e.key === 'Enter'){
        var click = new Event('click')
        document.querySelector(".login-btn").dispatchEvent(click)
    }
})