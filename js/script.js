
var modal = function(){


    this.setModal = (header, width, height) => {

        this.header = header;
        this.Modalwidth = width;
        this.Modalheight = height;

    };
        
    let closeModal = () => {

        $('.mymodalContainer').remove(); $('.modalBack').remove();
            
    };


    this.closeModal = closeModal;


    this.createModal = function(header, width, height){

        $('body').prepend('<div class="modalBack"></div>');
        $('body').prepend('<div class="container mymodalContainer"><div class="row"><div class="col-md-4"></div><div class="col-md-4 align-self-center"><div class="row justify-content-center"><div class="mymodal" style="width:' + this.Modalwidth +'px; height:' + this.Modalheight + 'px;"><div class="row" style="border-bottom: 2px solid black"><div class="col-md-7 mr-auto" style="font-size: 25px; padding-bottom:5px">' + this.header + ' </div><div class="col-md-1 ml-auto"><button id="close" class="mybtn"><span class="fa fa-times"></span></button></div></div></div></div></div><div class="col-md-4"></div></div></div>');
        $('#close').click(function(){closeModal()});
            
    };

        
};





var allPlaylistsData;
var playlistArray = [];
var nowPlaying;
var nowPlayingId;
var nowplayingData;
var nowPlayingPlaylist;
var playerOff = true;
const myModal = new modal;





const init = () => {

    playerOff = true;

    $.get('http://localhost:3004/dashboard/PLAYLIST/api/playlist',data =>{

        allPlaylistsData = data.data;
        console.log(data);
        drawPlaylistsOnScreen(data.data);

    });

};


const rewrite = () => {

    nowPlayingPlaylist = '';

    setTimeout(() => {
        myModal.closeModal();
        $('#container').html('');
        init();
        $('#container').append('<div id="playListsContainer" class="row justify-content-start">');
    }, 500);
    

};


const drawPlaylistsOnScreen = (data => {

    let divsClass;

    data.forEach((item, index) => {

        if(item.id !== nowPlayingPlaylist){

            drawOnePlaylistItem(item);
            
        }

    });

});


const drawOnePlaylistItem = (item) =>{

    playerOff? divsClass = 'playlistDiv': divsClass = 'playlistDivPlayerOnStatic';

        $('#playListsContainer').append('<div id="' + item.id + '" class="col-md-3 col-sm-6"><div class="' + divsClass + '"><div class="curved">' + item.name + '</div><img id="img' + item.id + '" src="' + item.image + '" class="playlist-image"><div class="playIcon-container"><span id="play-icon' + item.id + '" class="fa fa-play-circle fa-5x play-icon"></span></div><div id="edit' + item.id + '" class="editIcon-container"><span class="fa fa-pencil fa-2x edit-icon"></span></div><div id ="delete' + item.id + '" class="editIcon-container"><span class="fa fa-trash fa-2x edit-icon"></span></div></div></div>');
        $('#img' + item.id + ',#play-icon' + item.id).click(function () { 

            if(playerOff){

                playerOff = false;
                nowPlayingPlaylist = item.id;
                showPlayer(item.id);

            }
            else{
                
                changePlaylist(item);

            }

        });

        $('#edit' + item.id).click(function(){modalNewEditPlaylist(item)});
        console.log(item);
        $('#delete' + item.id).click(function(){modalDeletePlaylist(item)});
        $(".curved").arctext({ radius: 130 });

}


const showPlayer = (itemId => {

    $.get('http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + itemId, data => {

        drawPlayer(data.data);
        setTimeout(function () { $('#' + itemId).remove() }, 1000);
        writePlaylist(itemId);

    });
   

});



const drawPlayer = (data => {

    nowPlayingData = data;

    $('.playlistDiv').addClass('playlistDivPlayerOn');

    setTimeout(function () {

        $('#playListsContainer').addClass('playListsContainerPlayerOn');

    }, 1000);

    setTimeout(function () {

        $('.playlistDivPlayerOn').addClass('playlistDivPlayerOnStatic'); $('.playlistDivPlayerOnStatic').removeClass('playlistDivPlayerOn');

    }, 2000);

    $('.playlistDivPlayerOn').removeClass('playlistDiv');
    $('#container').append('<div class="row playerContainer"><div class="col col-md-3"></div><div class="col-md-6 col-sm-12 align-self-center"><div class="row justify-content-center"><div id="player" class="player"></div></div></div><div class="col col-md-3"></div></div>');
    $('#player').append('<div id="playerContainer" class="row"><div class="col-md-5 col-sm-3 col-xs-3 nowPlaying"><img id="nowPlayingImage" src="' + data.image + '" class="playlistImagePlayer spin"><div class="playIcon-container-onPlayer"><span id="playIconSpanOnPlayer" class="fa fa-pause-circle fa-5x play-icon-onPlayer"></span></div></div></div><div class="edit-Icon-container-container-onPlayer1"><div id="editNowPlaying" class="edit-Icon-container-onPlayer"><span class="fa fa-pencil fa-2x edit-icon-onPlayer"></span></div></div><div class="edit-Icon-container-container-onPlayer2"><div id="deleteNowPlaying" class="edit-Icon-container-onPlayer"><span class="fa fa-trash fa-2x edit-icon-onPlayer"></span></div></div>');

    $('#nowPlayingImage, .play-icon-onPlayer').click(function(){
        togglePlayPause();
    });

    $('#deleteNowPlaying').click(function(){modalDeletePlaylist(nowPlayingData)});
    $('#editNowPlaying').click(function(){modalNewEditPlaylist(nowPlayingData)});

    const togglePlayPause = () =>{

        $('#playIconSpanOnPlayer').toggleClass('fa-pause-circle');
        $('#playIconSpanOnPlayer').toggleClass('fa-play-circle');
        if(play.paused){
            play.play();
        }
        else{
            play.pause();
        }
    };

});



const writePlaylist = (itemId => {

    nowPlaying = 0;
    nowPlayingId = 'song' + nowPlaying;

    $.get('http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + itemId + '/songs', data => {

        console.log(data);
        write(data);

    });


    const write = (data => {

        $('#playerContainer').append('<div id="controlsAndSongsCol" class="col-md-6 col-sm-12 col-xs-12"><audio id="play" controls><source id="songSource" src="' + data.data.songs[0].url + '" type="audio/mpeg"></audio><div id="playlistSongsContainer"></div>');

        data.data.songs.forEach((item, index) => {

            playlistArray[index] = data.data.songs[index].url;

            $('#playlistSongsContainer').append('<div class="row songName"><div class="col-md-1 noPlaySpan"><span id="playspan" class="fa fa-play"></span></div><div id="song' + index + '" class="col-md-10">' + data.data.songs[index].name + '</div></div></div>');
            $('#song' + 0).addClass('nowPlayingSongname').siblings().addClass('yesPlaySpan nowPlayingSongname');


            $('#song' + index).click(function () {

                nowPlaying = index;
                nowPlayingId = 'song' + index;

                $('.nowPlayingSongname').addClass('notPlayingSongname');
                $('.notPlayingSongname').removeClass('nowPlayingSongname');
                $('.yesPlaySpan').addClass('noPlaySpan').removeClass('yesPlaySpan');                    // animations
                $('.noPlaySpan').removeClass('yesPlaySpan');
                $('#song' + index).addClass('nowPlayingSongname').siblings().addClass('yesPlaySpan nowPlayingSongname');
                $('#songSource').attr('src', data.data.songs[index].url);
                playSong();

            });

        });

            playSong();
            play.onended = function () { changeSong() };

    });   

});



const playSong = () => {

    var play = document.getElementById('play');
    play.load();
    play.play();
    const audio1 = document.getElementById('play');
    equalizer(audio1);

};



const changeSong = () => {

    nowPlaying += 1;
    if(nowPlaying)
    $('#songSource').attr('src', playlistArray[nowPlaying]);

    $('.nowPlayingSongname').addClass('notPlayingSongname');
    $('.notPlayingSongname').removeClass('nowPlayingSongname');
    $('.yesPlaySpan').addClass('noPlaySpan').removeClass('yesPlaySpan');                    // changes the now played song row animation effect and appearance
    $('.noPlaySpan').removeClass('yesPlaySpan');
    $('#song' + nowPlaying).addClass('nowPlayingSongname').siblings().addClass('yesPlaySpan nowPlayingSongname');

    play.load();
    play.play();

};



const changePlaylist = data => {

    nowPlayingData = data;

    console.log(data);
    
    let animation = image => {

        $('.nowPlaying').addClass('nowPlayingGo');
        setTimeout(function(){$('.nowPlayingGo').removeClass('nowPlayingGo')},1000);
        setTimeout(function(){$('#nowPlayingImage').attr('src',image);},1000);

    };


    let change = data => {

        let animation = () => {

            setTimeout(function(){
                $('.playlistDivChangePlaylist').removeClass('playlistDivChangePlaylist').addClass('playlistDivPlayerOnStatic');
                $('.playlistChange-image').removeClass('playlistChange-image').addClass('playlist-image');
            },2000);

        };

        setTimeout(function(){
            $('#playListsContainer').append('<div id="' + data.data.id + '"class="col-md-3 col-sm-6"><div class="playlistDivChangePlaylist"><div class="curved">' + data.data.name + '</div><img id="img' + data.data.id + '" src="' + data.data.image + '" class="playlistChange-image"><div class="playIcon-container"><span id="play-icon' + data.data.id + '" class="fa fa-play-circle fa-5x play-icon"></span></div><div id ="edit' + data.data.id + '" class="editIcon-container"><span class="fa fa-pencil fa-2x edit-icon"></span></div><div id ="delete' + data.data.id + '" class="editIcon-container"><span class="fa fa-trash fa-2x edit-icon"></span></div></div></div>');
            $(".curved").arctext({ radius: 130 });
            animation();

            $('#edit' + data.data.id).click(function(){modalNewEditPlaylist(data.data)});  

            $('#img' + data.data.id + ',#play-icon' + data.data.id).click(function () { 
                
                changePlaylist(data.data);

            });
        },2000);
    };


    animation(data.image);
    $('#controlsAndSongsCol').remove();
    writePlaylist(data.id);
    $('#' + data.id).attr('class','playlistChange');

    $.get('http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + nowPlayingPlaylist, data2 => {

        setTimeout(function(){$('#' + data.id).remove();},1000);                                // this is to give the animation some time        
        change(data2);
        nowPlayingPlaylist = data.id;

    });

    $(".curved").arctext({ radius: 130 });

};





const modalNewEditPlaylist = data => {

console.log(data);
        let playlistName;
        let playlistImage;
        let imgOk = false;

        data? myModal.setModal('edit Playlist','600','370'): myModal.setModal('add new playlist','600','370');
        myModal.createModal();

        if(data){

            playlistUpdateData = {};
            setTimeout(function(){
            $('[name="playlistNameInput"]').val(data.name);
            $('[name="playlistUrlInput"]').val(data.image); 
            $('#newPlaylistDialImg').attr('src',data.image);
            },10);

        }

        $('.mymodal').append('<div class="row" style="margin-top: 15px"><div id="newPlaylistDialNameInputs" class="col-md-6"><label for="playlistNameInput">Playlist name</label><input id="playlistNameInput" name="playlistNameInput" type="text" /><br /><br /><label for="playlistUrlInput">Playlist Url</label><input id="playlistUrlInput" name="playlistUrlInput" type="text" /><div class="row" style="margin-top: 60px"><div class="col-md-12"><button type="button" id="newPlayNext" class="mybtn">Next</button><button id="clearInputs" type="button" class="mybtn" style="margin-left: 20px">Reset fields</button></div></div></div><div class="col-md-6"><img id="newPlaylistDialImg" src="images/preview.png" style="border:1px solid black; height="250px" width="250px"" /></div></div>');

        $('#clearInputs').click(function(){$('input').val('')});

        $('#newPlayNext').click(() => {

            if(data){

                if($('#playlistUrlInput').val() == ''){
                    playlistUpdateData.image = data.image;
                    checkName();
                }
                else{
                    if(checkImgFilename($('#playlistUrlInput').val()) == false){
                    $('#playlistUrlInput').addClass('invalidInput');
                }
                else{
                    playlistUpdateData.image = $('#playlistUrlInput').val();
                    checkName();
                }
                } 
            }
            else{
                
                validateNewNameImage();

            }

        });


        let checkName = () => {


            if($('#playlistNameInput').val() == ''){
                        playlistUpdateData.name = data.name;
            }
            else{
                playlistUpdateData.name = $('#playlistNameInput').val();
            }

            $.post("http://localhost:3004/dashboard/PLAYLIST/api/playlist/" + data.id,{

                name: playlistUpdateData.name,
                image: playlistUpdateData.image
            });

            myModal.closeModal();
            songsDialEdit(data.id);
                
        };
        

        let songsDial = () => {

            let songs = [];

            myModal.setModal('add songs', '700');
            myModal.createModal();

            $('.mymodal').append('<div class="row"><div id="songInputsCont" class="col-md-12"><div class="row" style="margin-top: 15px"><div class="col-md-7"><input class="songUrl" type="text" cols="7" placeholder="url" style="width: 80%"></div><div class="col-md-3"><input class="songNameInput" type="text" placeholder="name"></div></div></div></div><div class="row" style="margin-top: 10px"><div class="col-md-1 mr-auto"><button id="addPlaylistInputButton" class="mybtn"><span class="fa fa-plus"></span></button></div><div class="col-md-2 ml-auto" style="position:relative; left:7px;"><button id="saveNewPlaylistButton" class="mybtn">SAVE</button></div></div>');

            $('.songUrl').keyup(function(){checkSongUrl(event)});
            $('.songNameInput').keyup(function(){checkSongname(event)});
            $('#addPlaylistInputButton').click(()=>{addPlaylistInput()});

            $('#saveNewPlaylistButton').click(()=>{

                validateSongs();
                validateUrls();

                if(validateSongs() && validateUrls()){
                    console.log('ok');
                    songs = makeSongsArray();
                    
                    $.post("http://localhost:3004/dashboard/PLAYLIST/api/playlist",{

                        name: playlistName,
                        image: playlistImage,
                        songs: JSON.stringify(songs)
                        
                    }).done(rewrite());

                }

            });


            let addPlaylistInput = () => {

                $('#songInputsCont').append('<div class="row" style="margin-top: 15px"><div class="col-md-7"><input class="songUrl" type="text" placeholder="url" style="width: 80%"></div><div class="col-md-2"><input class="songNameInput" type="text" placeholder="name"></div></div>');
                $('.songUrl').keyup(function(){checkSongUrl(event)});
                $('.songNameInput').keyup(function(){checkSongname(event)});

            };

        };


        let songsDialEdit = (id) =>{

            myModal.setModal('edit songs', '700');
            myModal.createModal();

            $.get('http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + id + '/songs', data => {

                addSongsInputsWithValues(data, id);

            });


            let addSongsInputsWithValues = data => {

                $('.mymodal').append('<div class="row"><div id="songInputsCont" class="col-md-12"><div class="row" style="margin-top: 15px"><div class="col-md-7"><input name="songUrlInput0" class="songUrl" type="text" cols="7" placeholder="url" style="width: 80%"></div><div class="col-md-3"><input name="songNameInput0" class="songNameInput" type="text" placeholder="name"></div></div></div></div><div class="row" style="margin-top: 10px"><div class="col-md-1 mr-auto"><button id="addPlaylistInputButton" class="mybtn"><span class="fa fa-plus"></span></button></div><div class="col-md-2 ml-auto" style="position:relative; left:7px;"><button id="saveEditedPlaylistButton" class="mybtn">SAVE</button></div></div>');
                $('#saveEditedPlaylistButton').click(()=>{

                    validateSongs();
                    validateUrls();

                    if(validateSongs() && validateUrls()){
                    console.log('ok');
                    songs = makeSongsArray();
                    
                    $.post('http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + id + '/songs',{

                        songs: JSON.stringify(songs)
                        
                    }).done(rewrite());

                }

                });

                $("[name=songNameInput0]").val(data.data.songs[0].name);
                $("[name=songUrlInput0]").val(data.data.songs[0].url);

                for(i=1; i<data.data.songs.length; i++){

                    $('#songInputsCont').append('<div class="row" style="margin-top: 15px"><div class="col-md-7"><input name="songUrlInput' + i + '" class="songUrl" type="text" placeholder="url" style="width: 80%"></div><div class="col-md-2"><input name="songNameInput' + i + '" class="songNameInput" type="text" placeholder="name"></div></div>');
                    $("[name=songUrlInput" + i +"]").val(data.data.songs[i].url);
                    $("[name=songNameInput" + i +"]").val(data.data.songs[i].name);

                };

                $('#addPlaylistInputButton').click(()=>{
                    $('#songInputsCont').append('<div class="row" style="margin-top: 15px"><div class="col-md-7"><input class="songUrl" type="text" placeholder="url" style="width: 80%"></div><div class="col-md-2"><input class="songNameInput" type="text" placeholder="name"></div></div>');
                    $('.songUrl').keyup(function(){checkSongUrl(event)});
                    $('.songNameInput').keyup(function(){checkSongname(event)});
                });

                $('.songUrl').keyup(function(){checkSongUrl(event)});
                $('.songNameInput').keyup(function(){checkSongname(event)});

            };
            

        }


        $('#playlistNameInput').keyup(() => {
            if($('#playlistNameInput').hasClass('invalidInput') && $('#playlistNameInput') !== ''){
                $('#playlistNameInput').removeClass('invalidInput');
            }
        });


        $('#playlistUrlInput').keyup(() => {

           $('#newPlaylistDialImg').on('error', () => {
               imgOk = false;
               $('#playlistUrlInput').addClass('invalidInput');
           });
        
            if(($('#playlistUrlInput').hasClass('invalidInput'))  && checkImgFilename($('#playlistUrlInput').val()) == true){
                
                imgOk = true;
                $('#playlistUrlInput').removeClass('invalidInput');
                $('#newPlaylistDialImg').attr('src',$('#playlistUrlInput').val());
            }
            else{
                if(checkImgFilename($('#playlistUrlInput').val()) == true){
                    $('#newPlaylistDialImg').attr('src',$('#playlistUrlInput').val());
                    imgOk = true;
                }
                else{
                    imgOk = false;
                    $('#newPlaylistDialImg').attr('src','images/preview.png');
                }
            }
        });


        let validateNewNameImage = () => {

            if(checkImgFilename($('#playlistUrlInput').val()) == false || $('#playlistNameInput').val() == undefined || $('#playlistNameInput').val() == ''){

                if(!$('#playlistNameInput').val()){
                    $('#playlistNameInput').addClass('invalidInput');
                }

                if(checkImgFilename($('#playlistUrlInput').val()) == false){
                    $('#playlistUrlInput').addClass('invalidInput');
                }
           
            }
            else{
                if(imgOk == true){

                    playlistName = $('#playlistNameInput').val();
                    playlistImage = $('#playlistUrlInput').val();

                    myModal.closeModal();
                    songsDial();
                }
            }
        };

    };



    const modalDeletePlaylist  = item => {

        myModal.setModal('delete','500','170');
        myModal.createModal();
        $('.mymodal').append('<div class="row justify-content-center" style="height: 55px; font-size: 30px;">delete ' + item.name + '?</div><div class="row"><div class="mr-auto col-auto"><button type="button" id="yesDeleteButton" class="mybtn">YES</button></div><div class="col-auto"><button type="button" id="noDeleteButton" class="mybtn">NO</button></div>');
        $('#yesDeleteButton').click(function(){

            $.ajax({
                url: 'http://localhost:3004/dashboard/PLAYLIST/api/playlist/' + item.id,
                type: 'DELETE',
                success: function() {
                    rewrite();
                }
            });

        });

        $('#noDeleteButton').click(function(){
            myModal.closeModal();
        })
    };


    const validateUrls = () => {

        let valid = true;

        $('.songUrl').each(function(){

            if(checkmp3Filename($(this).val()) == false){

                $(this).addClass('invalidInput');
                valid = false;

            }


        });

        return valid;

    };


    const validateSongs = () => {

        let valid = true;

        $('.songNameInput').each(function(item,index){

            if($(this).val() == ""){
                    
                $(this).addClass('invalidInput');
                valid = false;

            }

        });

        return valid;

    };


    function checkSongname(event){
        
        if(($(event.target).hasClass('invalidInput')) && ($(event.target).val() !=='')){

            $(event.target).removeClass('invalidInput');

        }
        
    };


    function checkSongUrl(event){
        
            if(($(event.target).hasClass('invalidInput')) && (checkmp3Filename($(event.target).val()) == true)){

            $(event.target).removeClass('invalidInput');

        }
        
    };


    const checkImgFilename = input => {

        let patt = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        let filename = input.match(patt);

        if(filename == null){

            return false;

        }
        else{

            if(filename[0] == '.jpg' || filename[0] == '.gif' || filename[0] == '.png'){

                return true;

            }
            else{

                return false;

            }

        }

    };


    const checkmp3Filename = input => {

        let patt = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        let filename = input.match(patt);

        if(filename == null){

            return false;

        }
        else{

            if(filename[0] == '.mp3'){

                return true;

            }
            else{

                return false;

            }

        }

    };


    const makeSongsArray = () => {

        let songs = [];
        let song = {};

        $("input").each(function(){

            if($(this).attr('class') == 'songNameInput'){

                song.name = $(this).val();

            }
            if($(this).attr('class') == 'songUrl'){

                song.url = $(this).val();

            }
            if(song.name && song.url){

                songs.push(song);
                song = {};
            }
            

        });
    
        return songs;

    };





    const search = () => {

        $('#noResults').remove();
        let results =false; 

        if($('[name=searchInput').val().length>1){
            $('#playListsContainer').html('');
            allPlaylistsData.forEach(function(item){
                if(item.name.includes($('[name=searchInput').val())){

                    let divsClass;
                    results = true;

                    drawOnePlaylistItem(item);

                }
                
            });
            if(!results){
                $('#container').prepend('<div id="noResults" class="row"><div class="col-md-4"></div><div class="col-md-4 align-self-center" style="font-size:60px"><div id="noResultsSpan" class="row justify-content-center">no results!</div></div><div class="col-md-4"></div></div>');
            }
        }
        if($('[name=searchInput').val().length == 0){
            
            $('#playListsContainer').html('');
            drawPlaylistsOnScreen(allPlaylistsData);
        }
        
    };


    const equalizer = (audio) => {
            
            var canvas, ctx, source, audioContext, equalizer, fbc_array, bars, bar_x, bar_width, bar_height; 
            $('#container').append('<canvas id="equalizer_render" style="height:300px; width:100%; background: transparent; position:fixed; top: 10px; z-index:100"></canvas>');
            audioContext = new AudioContext();
            equalizer = audioContext.createAnalyser();
            canvas = document.getElementById('equalizer_render');
            ctx = canvas.getContext('2d'); 
            source = audioContext.createMediaElementSource(audio);
            source.connect(equalizer);
            equalizer.connect(audioContext.destination);
            equalizer.fftSize = 64;
            colorArray = ['#ff7b55','darkseagreen','rgb(194, 100, 162)'];
            frameLooper();                             
            
            function frameLooper(){
                
                window.requestAnimationFrame(frameLooper);
                fbc_array = new Uint8Array(equalizer.frequencyBinCount);
                console.log(fbc_array);
                equalizer.getByteFrequencyData(fbc_array);
                ctx.clearRect(0,0,canvas.width,canvas.height);
                bars = 64;
                for(i = 0; i<bars; i++){
                    if(i>3 && i<8){
                        ctx.fillStyle = 'transparent';
                    }
                    else{
                        ctx.fillStyle = colorArray[i%3];
                    }
                    bar_x = i*25.5;
                    bar_width =13;
                    bar_height = -(fbc_array[i+6]/2.5);
                    //console.log(bar_x,bar_height);
                    ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
                
            };
            
        };
        

    };
    
    
    
    
    $(document).ready(function () {
        
        
        
    
        
    setTimeout(function(){$('.hellodiv').css('display', 'none')}, 2000);
    
    $('.addPlay').click(function(){modalNewEditPlaylist()});
    $('[name=searchInput').keyup(function(){search()});

    init();



    

});


