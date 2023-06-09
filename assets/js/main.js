// ===== VARIABLE DECLARATION ============================================================= //
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    }, {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    }, {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    }, {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    }, {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const el_container = document.querySelector("#container");

// ===== MAIN ============================================================================= //
popolateFeed(posts, el_container);
const el_like_buttons = document.querySelectorAll(".like-button");
const el_likes_counters = document.querySelectorAll(".js-likes-counter");
let id_liked_posts = []

// Add event listener to all liked button in dom
el_like_buttons.forEach((el_button, i) => {
    el_button.addEventListener('click', function () {
        modify_likes_counter(this.classList, el_likes_counters[i], id_liked_posts, posts[i].id);
        this.classList.toggle("like-button--liked");
        console.log(`ID dei post a cui hai messo like: ${id_liked_posts}`);
    })
})

// ===== FUNCTION INITIALIZATION ========================================================== //
function popolateFeed(posts, el_container) {
    posts.forEach(post => {
        const el_post = createPostElement(post);
        el_container.append(el_post);
    });
}

function createPostElement(post) {
    const el_post = document.createElement("div");
    el_post.classList.add("post");
    const markup = createPostMarkup(post);
    el_post.innerHTML = markup;
    return el_post;
}

function createPostMarkup(post) {
    const dateIta = convertDate(post.created, "en-GB");
    const markup = `
    <div class="post__header">
        <div class="post-meta">
            <div class="post-meta__icon">
                ${fallBack_profile_pic(post.author)}
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${post.author.name}</div>
                <div class="post-meta__time">${dateIta}</div>
            </div>
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src=${post.media} alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid="1">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div>
    </div>`
    return markup;
}

function toAmericanDate(dateStr) {
    let date = new Date(dateStr);
    return date.toLocaleDateString("en-US");
}

function convertDate(dateStr, format) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(format);
}

function fallBack_profile_pic(author) {
    if (author.image == null) {
        var nameSplitted = author.name.split(" ");
        const signature = nameSplitted[0].charAt(0) + nameSplitted[1].charAt(0);
        return `<div class="profile-pic-default"><span>${signature}</span></div>`
    } else {
        return `<img class="profile-pic" src=${author.image} alt="${author.name}"></img>`
    }
}

function modify_likes_counter(el_button_classList, el_likes_counter, id_liked_posts, post_id) {
    if (el_button_classList.contains("like-button--liked")) {
        el_likes_counter.innerText--;
        const index_id = id_liked_posts.indexOf(post_id);
        id_liked_posts.splice(index_id, 1); // 2nd parameter means remove one item only
    } else {
        el_likes_counter.innerText++
        id_liked_posts.push(post_id);
    }
}


