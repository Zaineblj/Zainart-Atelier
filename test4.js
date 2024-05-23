document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector("nav h4");
    const navMenu = document.querySelector("nav ul");

    menuBtn.addEventListener("click", function() {
        navMenu.classList.toggle("active");
    });
});


let angle = 0;
const pointAnimation = setInterval(() => {
    const radius = 49; 
    const centerX = 50; 
    const centerY = 50;
    const radians = angle * Math.PI / 180;
    const x = centerX + radius * Math.cos(radians);
    const y = centerY + radius * Math.sin(radians);
    document.getElementById('movingPoint').setAttribute('cx', x);
    document.getElementById('movingPoint').setAttribute('cy', y);
    angle += 1; // Vitesse de rotation
    if (angle >= 360) {
        angle = 0; 
    }
}, 50); 


// le compte à rebours
let count = 25;
const countdown = setInterval(() => {
    document.getElementById('countdown').innerText = count + " seats available for June";
    count--;
    if (count < 5) {
        clearInterval(countdown);
    }
}, 200);



function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Locomotive Scroll

    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".smooth-scroll", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, 
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".smooth-scroll").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();
}



document.addEventListener("DOMContentLoaded", function() {
    var elemC = document.querySelector("#elem-container");
    var fixed = document.querySelector("#fixed-image");

    elemC.addEventListener("mouseenter", function() {
        fixed.style.display = "block";
    });

    elemC.addEventListener("mouseleave", function() {
        fixed.style.display = "none";
    });

    var elems = document.querySelectorAll(".elem");
    elems.forEach(function(e) {
        e.addEventListener("mouseenter", function() {
            var image = e.getAttribute("data-image");
            fixed.style.backgroundImage = `url(${image})`;
        });
    });
});



function cursorEffect() {
    var page1Content = document.querySelector("#page1-content")
    var cursor = document.querySelector("#cursor")

    page1Content.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })
    page1Content.addEventListener("mouseenter", function (dets) {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })
    page1Content.addEventListener("mouseleave", function (dets) {
        gsap.to(cursor, {
            scale: 0,
            opacity: 1
        })
    })
}
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.getElementById('cursor');
    const videoCursor = document.getElementById('videoCursor');
    const reelVideo = document.getElementById('reelVideo');
    const closeVideo = document.getElementById('closeVideo');
    const page1 = document.getElementById('page1');


    function isClickableElement(target) {
        return target.closest('a') || target.closest('button') || target.closest('.ignore-click');
    }

    page1.addEventListener('click', function(event) {
        if (!isClickableElement(event.target)) {
            videoCursor.style.display = 'flex';
            reelVideo.play();
        }
    });


    closeVideo.addEventListener('click', function(event) {
        event.stopPropagation(); 
        reelVideo.pause();
        reelVideo.currentTime = 0;
        videoCursor.style.display = 'none';
    });
});


cursorEffect()

function page2Animation() {
    gsap.from(".elem h1", {
        y: 120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main", 
            start: "top 40%", 
            end: "top 37%", 
            scrub: 2,

        }
    });
}

page2Animation();

function sliderAnimation(){
    var swiper = new Swiper(".mySwiper", {
       /* slidesPerView: 1,*/
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
          },
      });
}

sliderAnimation ()

var tl = gsap.timeline()

tl.from("#loader h3",{
    x:40,
    opacity: 0,
    duration: 2,
    stagger:0.6
})
tl.to("#loader h3",{
    opacity:0,
    x:-10,
    duration:1,
    stagger:0.1
})
tl.to("#loader",{
    opacity:0
})
tl.from("#page1-content h1 span",{
    x:-100,
    opacity:0,
    stagger:0.1,
    duration:0.5,
    delay: -0.5
})
tl.to("#loader",{
    display:"none"
})

var menu = document.querySelector("nav h4");
var full = document.querySelector("#full-screen");
var navh3 = document.querySelector("nav h3");
var flag = 0;

menu.addEventListener("click", function() {
    if (flag === 0) {
        full.style.top = "0";
        navh3.style.opacity = "1"; 
        flag = 1;
    } else {
        full.style.top = "-100%";
        navh3.style.opacity = "1"; 
        flag = 0;
    }
});

// afficher le formulaire après le choix d'option
function showForm() {
    var selectBox = document.getElementById("contactOption");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    var form = document.getElementById("contactForm");
    var showFormBtn = document.getElementById("showFormBtn");

    if (selectedValue === "") {
        form.style.display = "none";
        showFormBtn.style.display = "none";
    } else {
        form.style.display = "block";
        showFormBtn.style.display = "inline-block";
    }
}


document.getElementById("contactOption").addEventListener("change", showForm);


document.addEventListener('DOMContentLoaded', function () {
    const errorMessage = document.getElementById('error-message');
    const memoryGame = document.getElementById('memory-game');
    
    const cards = [
        'media 4/DECO.jpg', 'media 4/DECO.jpg',
        'media 4/moi en train de peindre.jpg', 'media 4/moi en train de peindre.jpg',
        'media 4/artist1.jpg', 'media 4/artist1.jpg',
        'media 4/woman.jpg', 'media 4/woman.jpg'
    ];

    let flippedCards = [];
    let matchedPairs = 0;

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    function createCard(image) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = image;

        const cardImage = document.createElement('img');
        cardImage.src = image;
        card.appendChild(cardImage);

        card.addEventListener('click', function () {
            if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
                card.classList.add('flipped');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    setTimeout(checkForMatch, 1000);
                }
            }
        });

        return card;
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.image === card2.dataset.image) {
            matchedPairs++;
            if (matchedPairs === cards.length / 2) {
                alert('You won! All pairs matched.');
            }
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
    }

    function startMemoryGame() {
        window.location.href = 'memorygame.html';
        matchedPairs = 0;
        flippedCards = [];
        shuffle(cards);
        cards.forEach(image => {
            const card = createCard(image);
            memoryGame.appendChild(card);
        });
    
        memoryGame.style.display = 'block';
        errorMessage.style.display = 'none';
    }

});

