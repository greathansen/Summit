var myMusicPlayer = $('#myMusicPlayer');
var myPlayList = $('#myPlayList');
var tracks = myPlayList.find('li a');
var playListIndex = 0;
var playListLength = tracks.length - 1;

$('a').addClass('dragout');
$('a').attr('draggable', 'true'); 

myPlayList.find('a').click(function(e)
{
    e.preventDefault();
    var link = $(this);
    playListIndex = link.parent().index();
    play(link);
});

myMusicPlayer[0].addEventListener('ended', function()
{
    var link;
    playListIndex++;

    if (playListIndex >= playListLength)
    {
        playListIndex = 0;
        link = myPlayList.find('a')[0];
    }
    else
    {
        link = myPlayList.find('a')[playListIndex];
    }

    play($(link));
});

(function() {
    var files = document.querySelectorAll('a.dragout');
                
    for (var i = 0, file; file = files[i]; ++i) {

    file.addEventListener('dragstart', function(e) {
                
    var strippedUrl = document.location.toString().split("Views");
    var href = this.getAttribute('href');

    var dataDownloadUrl = 'audio/mpeg:' + href.substring(9, href.length).replace(' ', '%20') + ':' + strippedUrl[0].toString() + href.substring(3, href.length).replace('\\','/').replace(' ', '%20');
                
    e.dataTransfer.setData('DownloadURL', dataDownloadUrl);
        }, false);
    }
})();

function play(link)
{
    changeImage();
    myMusicPlayer[0].src = link.attr('href');
    link.parent().addClass('selected').siblings().removeClass('selected');
    myMusicPlayer[0].load();
    myMusicPlayer[0].play();
}

function changeImage()
{
    var index = playListIndex + 1;
    $('img').attr('src', "..\\Images\\" + index + ".jpg");
}