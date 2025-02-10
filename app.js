// Mon app de type de todo en JS avec le local storage 

// Le local storage permet de stocker, sans expiration, des données dans le navigateur (on les retrouve via l'inspecteur dans la partie Applications)

// VOTRE MISSION : Faire une app de type TODO

// 1 - Vous aurez un input dans le quel vous pouvez insérer une tache à effectuer 
// (ex: Faire le MCD de l'app). Il faudra écouter le btn de soumission et récupérer la valeur de l'input (on peut utiliser l'event)

// AJOUTER UNE TODO : Une fois que vous aurez soumis cette tache, après avoir cliqué sur un btn de soumission
// Elle devra s'afficher en dessous de l'input dans un genre de ticket (comme Trello)
// Celle-ci (son contenu) devra aussi etre ajouté en LS

// SUPPRIMER UNE TODO : Chaque Todo aura un bouton de suppression et lorsquel'on clique 
// sur ce bouton la Todo doit disparaitre visuellement mais aussi dans le LS

// CHECKER / UNCHECKER UNE TODO : Au départ les todos ajoutées doivent avoir un état de type "non résolu", un bouton 
// de type check doit permettre de valider la todo cad quand on clique sur le bouton on considère que la tache est effectuée
// Au départ par exemple la todo peut etre rouge et quand on clique sur le check elle devient verte 
// OU lorsque l'on clique sur le check le contenu de la todo se barre  

// BONUS : On doit pouvoir modifier le contenu d'une Todo, ainsi qu'en LS.

// NOS VARIABLES

// Première étape : On recup les éléments HTML que l'on va utiliser et dynamiser
const input = document.querySelector("input")
const submit = document.querySelector("button")
const todosSection = document.querySelector(".all-todos")


// NOS FONCTIONS

// Fonction qui recup les todos depuis le LS lors du chargement de la page 
// Si il n'y a rien en LMS on initialise notre tableau dde todops à un tableau vide
function getTodos() {
    if (JSON.parse(localStorage.getItem("todos"))) {
        let allTodos = JSON.parse(localStorage.getItem("todos"))
        return allTodos
    // Sinon j'initialise allTodos à tableau vide
    } else {
        let allTodos = []
        return allTodos
    }
}

// Fonction d'affichage des todos sur la page
function displayTodo(todo) {
        // On créer les éléments qui vont constituer ma todo en JS
        let wrapper = document.createElement("div")
        let p = document.createElement("p")
        let closeBtn = document.createElement("button")
        let check = document.createElement("input")
        let editBtn = document.createElement("button")

        // Je donne du contenu texte à mes différents éléments 
        p.textContent = todo
        editBtn.textContent = "Edit todo"
        check.type = "checkbox"

        // J'ajoute l'écouteur d'événements sur le bouton de suppression 
        // je viens appeller la fonction deleteTodo qui viendra supprimer la todo du tableau des todos
        closeBtn.addEventListener("click", () => {
            deleteTodo(todo)
        })

        editBtn.addEventListener("click", (e) => {
            editTodo(todo, e.target)
        })

        // J'insère dans le wrapper les eléménts crées plus haut 
        // ET j'insèrerai le wrapper dans la section des todos
        wrapper.append(check , editBtn, closeBtn, p)
        todosSection.appendChild(wrapper)
    
}

// Fonction de suppression de notre todo : elle actualise allTodos ainsi que le LS et met à jour l'affichage des todos sur la page
function deleteTodo(todo) {
    // Pour supprimer une todo je dois : 
    // La supprimer visuellement mais aussi dans le LS

    // On va recup l'index dans le tableau des todos de la todo en question
    let index = allTodos.indexOf(todo)
    allTodos.splice(index, 1)

    // Il faut maintenant aussi changer le tableau des todos dans le LS
    localStorage.setItem("todos", JSON.stringify(allTodos))

    todosSection.innerHTML = ""

    allTodos.forEach((todo) => {
        displayTodo(todo)
    })
}

// Fonction d'édition d'une todo
function editTodo(todo, target) {
    // On récupère le wrapper de la todo (div qui la contient)
    let wrapper = target.parentNode

    // Récupération de l'élément <p> qui contient la todo pour le remplacer par un input
    let p = wrapper.querySelector("p")
    let input = document.createElement("input")
    input.type = "text"
    input.value = todo
    input.placeholder = "Modifier la todo..."

    // Remplace <p> par l'input
    wrapper.replaceChild(input, p)

    // Sélection du bouton edit Todo
    let btn = wrapper.querySelector("button")

    // Écouteur d'événement sur le bouton pour valider la modification
    btn.addEventListener("click", () => {
        // On recup la valeur de l'input (ce qui est tapé par le user)
        let newValue = input.value

        if (newValue) {
            let newP = document.createElement("p")
            newP.textContent = newValue
            wrapper.replaceChild(newP, input)

            // Mise à jour dans le tableau des todos
            let index = allTodos.indexOf(todo)
            
            // Si l'index existe bel et bien (et donc la todo dans notre tableau)
            if (index !== -1) {
                allTodos[index] = newValue
            }

            // Sauvegarde dans le localStorage
            localStorage.setItem("todos", JSON.stringify(allTodos))
        }
    })
}

// INITIALISATION DES TODOS ET ECOUTEUR D'EVENEMENT

// On crée allTodos qui contient ce que la fonction getTodos nous retourne
let allTodos = getTodos()

// Si la lonhgueur de notre tableau de todos est supérieure à 0 (cad qu'il n'est pas vide)
// alors on affiche les todos au bon endroit
if (allTodos.length > 0) {
    allTodos.forEach((todo) => {
        displayTodo(todo)
    })
}

// Seconde étape : On ajoute un écouteur d'événement à notre bouton de soumission
submit.addEventListener("click", () => {
    // On récupère ce que le user écrit dans l'input en vue d'en fair une todo
    const inputValue = input.value

    // Avant de prendre en compte ce que le user va insérer dans notre input 
    // On vérifie que cet inpût ne soit pas vide 
    if (inputValue != "") {

        // Dans un premier temps afficher la todo en dessous 
        // Puis l'enregistrer en LS

        // Je rajoute ma todo au tableau de toutes les todos (cf au dessus du listener)
        allTodos.push(inputValue)

        displayTodo(inputValue)

        // J'ajoute mon tableau de todos au localStorage au nom "todos"
        localStorage.setItem("todos", JSON.stringify(allTodos))
    }

    // On nettoie l'input après utilisation
    input.value = ""
})
