/**
 * Created by yaros on 17.10.2016.
 */

(function () {

    function Carousel(pictures) {
        var pictures = pictures;
        var currentPosition = 0;
        var step = 10;
        var prevCheckedRadioId = 1;

        var carouselContainer = document.createElement('div');
        carouselContainer.className = 'carousel-container-like';
        carouselContainer.setAttribute('id', 'road-constr-carousel-container');
        var carousel = document.createElement('ul');
        carousel.className = 'carousel';
        var carouselControlsContainer = document.createElement('ul');
        carouselControlsContainer.className = 'carousel-controls-container';

        var addSlide = function (number, imagePath) {
            var slide = document.createElement('li');
            slide.className = 'slide slide-' + number;
            var image = document.createElement('img');
            image.setAttribute('src', imagePath);
            image.className = 'slide-image';
            slide.appendChild(image);

            addCarouselButton(number);
            carousel.appendChild(slide);
        }

        function addCarouselButton(number) {
            var carouselButton = document.createElement('li');
            carouselButton.className = 'carousel-btn-like';
            carouselButton.setAttribute('id', 'carousel-btn-' + number);
            if(number == 1) {
                carouselButton.className = carouselButton.className.concat(' ', 'checked');
            }
            carouselControlsContainer.appendChild(carouselButton);
        }

        this.launchCarousel = function() {
            var countOfSlides = document.querySelectorAll('.slide').length;

            setInterval(function() {
                if(currentPosition > (-step * (countOfSlides - 1))) {
                    currentPosition -= step;
                    slideOn(currentPosition);
                    changeCheckedButton(prevCheckedRadioId + 1);
                } else {
                    currentPosition = 0;
                    slideOn(currentPosition);
                    changeCheckedButton(1);
                }

            }, 10000);
        }

        function changeCheckedButton(id) {
            var buttons = document.querySelectorAll('.carousel-btn-like');
            for (var i = 0; i < buttons.length; i++) {
                if(buttons[i].className.indexOf('checked') !== -1) {
                    buttons[i].className = buttons[i].className.replace(' checked', '');
                }
            }
            var currentChecked = document.querySelector('#carousel-btn-' + id);
            currentChecked.className = currentChecked.className.concat(' ', 'checked');
            prevCheckedRadioId = id;
        }

        var slideNeedCountOfTimes = function(target) {
            var getNumberPattern = /\d+/g;
            var currentButtonId = parseInt(target.getAttribute('id').match(getNumberPattern));
            var nextPosition = currentPosition - step * (currentButtonId - prevCheckedRadioId);
            slideOn(nextPosition);
            changeCheckedButton(currentButtonId);
            currentPosition = nextPosition;
        }

        function slideOn(nextPosition) {
            var slides = document.querySelectorAll('.slide');
            for(var i = 0; i < slides.length; i++) {

                slides[i].style.left =  nextPosition + "%";
            }
        }

        function createSlidesWithContent() {
            for(var i = 0; i < pictures.length; i++) {
                addSlide(i + 1, pictures[i]);
            }
        }

        this.createCarousel = function () {
            createSlidesWithContent();
            carouselContainer.appendChild(carousel);
            carouselContainer.appendChild(carouselControlsContainer);
            return carouselContainer;
        }

        carouselControlsContainer.onclick = function(event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if(target.className.indexOf('carousel-btn-like') !== -1) {
                slideNeedCountOfTimes(target);
            }
        };
    }

    function createReasonsBlock(reasons) {
        var image = document.createElement('img');
        image.setAttribute('src', 'road_constr_main_images/constructor.jpg')
        var header = document.createElement('h2');
        header.className = 'reasons-header';
        var headText = document.createTextNode('Причини обрати "Дорожньо-будівельний факультет"');
        header.appendChild(headText);
        var reasonsContainer = document.createElement('div');
        reasonsContainer.setAttribute('id', 'reasons-container');
        var reasonsList = document.createElement('ul');
        reasonsList.className = 'reasons-to-enter-faculty';

        for(var i = 0; i < reasons.length; i++) {
            var listElem = document.createElement('li');
            var text = document.createTextNode(reasons[i]);
            listElem.appendChild(text);
            reasonsList.appendChild(listElem);
        }
        reasonsContainer.appendChild(image);
        reasonsContainer.appendChild(header);
        reasonsContainer.appendChild(reasonsList);
        return reasonsContainer;
    };


    var node = document.querySelector('.floatbox');
    var carousel = new Carousel(['road_constr_main_images/11.jpg','road_constr_main_images/33.jpg','road_constr_main_images/44.jpg', 'road_constr_main_images/22.jpg', 'road_constr_main_images/55.jpg']);
    node.insertBefore(carousel.createCarousel(), node.childNodes[0]);
    carousel.launchCarousel();

    var reasons = ['Ти маєш креативне мислення та обожнюєшь створювати щось нове', 'Тебе цікавлять точні науки та наукові відкриття', 'Бажаешь завести нові знайомства та мати купу друзів', 'Мрієш стати висококваліфікованим спеціалістом у будівельній галузі', 'Хочешь щоб твоя професія була затребуваною та високооплачуваною'];

    node.appendChild(createReasonsBlock(reasons));

})();