(function(){

  var elements = {
    mobile_menu_toggle: document.getElementById('mobile-menu-toggle'),
    mobile_menu_open_icon: document.getElementById('mobile-menu-toggle').getElementsByTagName('i')[0],
    mobile_menu_close_icon: document.getElementById('mobile-menu-toggle').getElementsByTagName('i')[1],
    mobile_menu: document.getElementById('mobile-menu'),
    mobile_search_toggle: document.getElementById('mobile-search-toggle').getElementsByTagName('i')[0],
    mobile_search: document.getElementById('mobile-search'),
    mobile_search_input: document.getElementById('mobile-search').getElementsByTagName('input')[0],
    search:{ icon: document.getElementById('search-icon'), form: document.getElementById('search-form') },
    header: document.getElementById('app-header'),
    footer: document.getElementById('app-footer'),
    footerHiddenInp: document.getElementById("footer-columns"),
    posts: {
      quote: document.querySelectorAll('.quote'),
      text: document.querySelectorAll('.text'),
      photo: document.querySelectorAll('.photo'),
      chat: document.querySelectorAll('.chat')
    }

  };

  var footerColCount = elements.footerHiddenInp ? elements.footerHiddenInp.value : 0;

  bindHandlers();

  function bindHandlers(){
    
    // Mobile Search Interactions
    elements.mobile_search_toggle.addEventListener('click', function(){
      apollo.toggleClass(elements.mobile_search, 'active');
      apollo.toggleClass(elements.mobile_search_toggle, 'active');

      elements.mobile_search_input.focus();   
    });

    elements.mobile_search_input.addEventListener('blur', function(){
      apollo.removeClass(elements.mobile_search, 'active');
      apollo.removeClass(elements.mobile_search_toggle, 'active');
      elements.mobile_search_input.value = '';
    });


    // Mobile Menu Interactions
    elements.mobile_menu_toggle.addEventListener('click', function(){
      apollo.toggleClass(elements.mobile_menu, 'active');
      apollo.toggleClass(elements.mobile_menu_toggle, 'active');
      apollo.toggleClass(elements.mobile_menu_open_icon, 'hide');
      apollo.toggleClass(elements.mobile_menu_close_icon, 'active hide');
    });

    elements.search.icon.addEventListener('click', function(){
      elements.search.form.submit();
    });

  }

  setPostsClicks();

  function setPostsClicks(){

    var
    texts = elements.posts.text,
    quotes = elements.posts.quote,
    photos = elements.posts.photo,
    chats = elements.posts.chat,
    i = 0,
    l = texts.length; 
    
    for(; i < l; i++){
      if( apollo.hasClass(elements.posts.text[i], 'index-page') ){
        elements.posts.text[i].addEventListener('click', openPermalink);
      }
    }

    i = 0;
    l = quotes.length; 
    for(; i < l; i++){
      if( apollo.hasClass(elements.posts.quote[i], 'index-page') ){
        elements.posts.quote[i].addEventListener('click', openPermalink);
      }
    }

    i = 0;
    l = photos.length; 
    for(; i < l; i++){
      if( apollo.hasClass(elements.posts.photo[i], 'index-page') ){
        elements.posts.photo[i].addEventListener('click', openPermalink);
      }
    }

    i = 0;
    l = chats.length; 
    for(; i < l; i++){
      if( apollo.hasClass(elements.posts.chat[i], 'index-page') ){
        elements.posts.chat[i].addEventListener('click', openPermalink);
      }
    }
  }

  function openPermalink(e){
    var post = e.currentTarget;
    window.location.assign(post.dataset.permalink);
  }

  setFooterColumns();

  function setFooterColumns(){
    var columns = elements.footer.querySelectorAll('.footer-column');
    var l = columns.length; 
    for(var i = 0; i < l; i++){
      if(i < footerColCount){
        apollo.addClass(columns[i], 'col-sm-' + (12/footerColCount) );
      }else{
        apollo.addClass(columns[i], 'hidden');
      }
    }
  }

  document.addEventListener('scroll', onBodyScroll);

  var top, result, h = document.getElementById('app-header').children[0];

  function onBodyScroll(e){
      
     top = window.pageYOffset - h.clientHeight;
     result = Math.abs((top/h.clientHeight)*100)/2;
    
    // console.log('window.pageYOffset: ' + window.pageYOffset);
    // console.log('h.clientHeight: ' + h.clientHeight);
    // console.log('visible Height: ' + Math.abs(window.pageYOffset - h.clientHeight));

    elements.header.style.backgroundPosition= '50% ' + result +'%';
  }

}());