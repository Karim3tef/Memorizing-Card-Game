$(function(){
    var duration = 500;

    $('.start-button').click(function(){

        playerName = prompt("what's your name");

        document.querySelector('.playername').innerHTML = playerName;

        $(".start").fadeOut();

        if (playerName == null || playerName == "" || playerName.length > 20 || playerName == " ") {
            document.querySelector('.playername').innerHTML = "Unknown";
            setTimeout(() => {
                $('.front-card').css({
                    'transition': 'all .54s ease-in-out',
                    'transform': 'rotateY(0deg)'
                })
                $('.back-card').css({
                    'transition': 'all .54s ease-in-out',
                    'transform': 'rotateY(180deg)'
                })
            },2000);
        } else {
            setTimeout(() => {
                $('.front-card').css({
                    'transition': 'all .54s ease-in-out',
                    'transform': 'rotateY(0deg)'
                })
                $('.back-card').css({
                    'transition': 'all .54s ease-in-out',
                    'transform': 'rotateY(180deg)'
                })
            },2000);
        }

        setTimeout(function(){
            $(".main").show();
        },duration);

    });

    $(".front-card").click(function(){
        $(this).css({
            "transform":"rotateY(180deg)",
            "transition":"transform all ease .6s"
        });
        $(this).next('.back-card').css({
            "transform":"rotateY(0deg)",
            "transition":"transform all ease .6s"
        });
    });

    var counter = 0;
    var clicks = 0;
    $('.front-card').click(function() {
        $(this).closest('ul').addClass('rem');

        if (clicks == 0){
            $(this).addClass("clicked");
            $(this).closest('ul').addClass("no-clicking");


        } else{
            $(this).addClass("clicked2");
            $(this).closest('ul').addClass("no-clicking");
            $('.blocks').addClass("no-clicking");
            setTimeout(() => {
                $('.blocks').removeClass("no-clicking");

            },duration);

            if($('.clicked').attr("data-similarity") == $('.clicked2').attr("data-similarity") && $('.clicked').closest('ul').css("order") !== $('.clicked2').closest('ul').css("order")) {

                $('.clicked').closest('ul').addClass('check-win');
                $('.clicked2').closest('ul').addClass('check-win');
                $('.blocks').find('.clicked').removeClass('clicked');
                $('.blocks').find('.clicked2').removeClass('clicked2');
                $('.blocks').find('.no-clicking').removeClass('no-clicking');

                setTimeout(function(){
                    $('.rem').css('opacity','0');

                },duration);

            }
            else {


                setTimeout(function(){
                    ++counter;
                    document.querySelector('.wrongs').innerHTML = counter;
                },duration);

                setTimeout(function(){
                    $('.clicked').css({
                        'transform':'rotateY(0deg)',
                        "transition":"transform all ease .6s"
                    });
                    $('.back-card').css({
                        'transform':'rotateY(180deg)',
                        "transition":"transform all ease .6s"
                    });
                    $('.clicked2').css({
                        'transform':'rotateY(0deg)',
                        "transition":"transform all ease .6s"
                    });
                    $('.blocks').find('.clicked').removeClass('clicked');
                    $('.blocks').find('.clicked2').removeClass('clicked2');
                    $('.blocks').find('.no-clicking').removeClass('no-clicking');
                    $('.blocks').find('.rem').removeClass('rem');
                },duration);
            }
            if(clicks <= 2) {
                clicks = -1
            }
        }
        ++clicks;
        

    });

    var cards = document.querySelector('.blocks');

    var blocks = Array.from(cards.children)

    var orderRange = Array.from(Array(blocks.length).keys());
    shuffel(orderRange);
    console.log(orderRange);

    blocks.forEach((blocks , index)=>{
        blocks.style.order = orderRange[index];
    });

    function shuffel(array) {

        let current = array.length,
        temp,
        random;

        while (current > 0) {

            random = Math.floor(Math.random() * current);

            current--;

            temp = array[current];

            array[current] = array[random];

            array[random] = temp

        }

        return array;

    }

    document.addEventListener('click',()=>{
        var wincheck = $('.check-win');
        var score = document.querySelector('.wrongs');
        if (wincheck.length == 20) {
            setTimeout(()=>{
                document.querySelector('.playerwin').innerHTML = playerName;
                $('.win-message').fadeIn(1000);
                $('.score').fadeIn(1000);
                document.getElementById("audio").play();
                if (score.innerHTML <= 5) {
                    document.querySelector('.scoreval').innerHTML = '5000';
                } else if (score.innerHTML <= 10) {
                    document.querySelector('.scoreval').innerHTML = '4000';
                }
                else if (score.innerHTML <= 15) {
                    document.querySelector('.scoreval').innerHTML = '3000';
                }
                else if (score.innerHTML <= 20) {
                    document.querySelector('.scoreval').innerHTML = '2000';
                } else {
                    document.querySelector('.scoreval').innerHTML = '1000';
                }
            },duration)
        }
    })


});

