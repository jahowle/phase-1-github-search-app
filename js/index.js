/*

1. Add event listener to button
2. it takes the input and stores it into a variable
3. make a GET request to the API using the variable
4. turn response into JSON object and call render user function
5. Render user using the response and attach user to the dom
6. add event listener to a button in the user item
7. make get request to API to retrieve that users repos
8. turn response in JSON object and call render repos function
9. add repos to the user object in the dom



*/

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#github-form").addEventListener("submit", handleSearch)
})

function handleSearch(e) {
    e.preventDefault()
    let query = e.target.search.value
    getUser(query)
}

function getUser(user) {
    fetch(`https://api.github.com/search/users?q=${user}`, {
        method: 'GET',
        headers: {
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(res => res.json())
    .then(data => renderUser(data))

}

function renderUser(user) {
    let userCard = document.createElement('div')
    userCard.className = 'user'
    userCard.id = user.items[0].login
    userCard.innerHTML = `
        <h2>${user.items[0].login}</h2>
        <img src=${user.items[0].avatar_url} class="user-avatar" />
        <button class="btn">Get Repos</button>
        <ul id="${user.items[0].login}-repo" class="repos"></ul>
    `
    document.querySelector('#user-list').appendChild(userCard)
    document.querySelector('.btn').addEventListener('click', () => {
        fetch(`https://api.github.com/users/${userCard.id}/repos`, {
            method: 'GET',
            headers: {
                Accept: "application/vnd.github.v3+json"
            }
        })
        .then(res => res.json())
        .then(data => data.forEach(repo => addRepos(repo)))
    })
}

function addRepos(repo) {
    let userRepo = document.createElement('li')
    userRepo.id = repo.name
    userRepo.innerHTML = `
    ${repo.name}
    `
    document.querySelector(`#${repo.owner.login}-repo`).appendChild(userRepo)
}

