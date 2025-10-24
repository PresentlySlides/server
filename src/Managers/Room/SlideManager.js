class SlideManager {
    constructor(room, slideCount = 0) {
        this.room = room;

        this.maxSlide = slideCount;
        this.slide = 0;
    }

    updateSlideCount(newSlideCount) {
        if (this.maxSlide > newSlideCount) slide = jumpSlide(newSlideCount - 1);
        this.maxSlide = newSlideCount;
        return true;
    }

    jumpSlide(newSlide) {
        if (!(newSlide >= 0 && newSlide <= this.maxSlide)) return false;
        this.slide = newSlide;
        return true;
    }

    nextSlide() {
        return this.jumpSlide(this.slide + 1);
    }

    previousSlide() {
        return this.jumpSlide(this.slide - 1);
    }
}

export default SlideManager;
