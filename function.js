const tracksContainer = document.querySelector('.track');
const tracks = Array.from(tracksContainer.children)
const prevbtn = document.querySelector('.prevbtn')
const nextbtn = document.querySelector('.nextbtn')
const navContainer = document.querySelector('.nav-container');
const navbtn = Array.from(navContainer.children);
const trackWidth = tracks[0].getBoundingClientRect().width

//Setting all the Track content in Column
const setTracksColumn = (track, index) => {
    track.style.left = 325 * index + 'px';
}

tracks.forEach(setTracksColumn)

//Left/Right moving function

const trackMove = (tracksContainer, currentTrack, targetTrack) => {
    tracksContainer.style.transform = 'translate(-' + targetTrack.style.left + ')'
    currentTrack.classList.remove('currentTrack');
    targetTrack.classList.add('currentTrack')
}

//Updating dots function

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('currenttrack');
    targetDot.classList.add('currenttrack')
}

const updateArrows = (targetDotIndex, prevbtn, nextbtn, tracks) => {
    if (targetDotIndex === 0) {
        prevbtn.classList.add('hideBtn')
        nextbtn.classList.remove('hideBtn')
    } else if (targetDotIndex === tracks.length - 1) {
        prevbtn.classList.remove('hideBtn')
        nextbtn.classList.add('hideBtn')
    } else {
        prevbtn.classList.remove('hideBtn')
        nextbtn.classList.remove('hideBtn')
    }
}

prevbtn.addEventListener('click', e => {
    const currentTrack = tracksContainer.querySelector('.currentTrack');
    const prevTrack = currentTrack.previousElementSibling;
    trackMove(tracksContainer, currentTrack, prevTrack)
    const currentDot = navContainer.querySelector('.currenttrack')
    const prevDot = currentDot.previousElementSibling;
    const prevslide = tracks.findIndex(slide => slide === prevTrack)
    updateDots(currentDot, prevDot)
    updateArrows(prevslide, prevbtn, nextbtn, tracks)
})

nextbtn.addEventListener('click', e => {
    const currentTrack = tracksContainer.querySelector('.currentTrack');
    const nextTrack = currentTrack.nextElementSibling;
    trackMove(tracksContainer, currentTrack, nextTrack)
    const currentDot = navContainer.querySelector('.currenttrack');
    const nextDot = currentDot.nextElementSibling;
    const slideIndex = tracks.findIndex(slide => slide === nextTrack)
    updateDots(currentDot, nextDot);
    updateArrows(slideIndex, prevbtn, nextbtn, tracks);
})

navContainer.addEventListener('click', e => {
    const targetDot = e.target.closest('button')
    if (!targetDot) return
    const currentTrack = tracksContainer.querySelector('.currentTrack');
    const currentDot = navContainer.querySelector('.currenttrack')
    const targetDotIndex = navbtn.findIndex(dot => dot === targetDot)
    const targetSlide = tracks[targetDotIndex]

    trackMove(tracksContainer, currentTrack, targetSlide);
    updateDots(currentDot, targetDot)
    updateArrows(targetDotIndex, prevbtn, nextbtn, tracks);
})