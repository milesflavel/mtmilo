// Simple entity
function Entity(x, y){
  // Properties
  this.parent = null;
  this.children = new Array();
  this.x = x;
  this.y = y;
  this.mouseover = false;
  this.tvframe = 0;
  this.tooltip = "";
  this.visible = true;

  // Methods
  this.render = function(context){
    if (this.visible){
      for (var i = 0; i < this.children.length; i++){
        this.children[i].render(context);
      }
    }
  };
  this.animate = function(){};
  this.update = function(){
    for (var i = 0; i < this.children.length; i++){
      this.children[i].update();
    }
    this.animate();
  };
  this.checkMouseover = function(x, y){
    if (this.visible){
      // Check mouseover state for this object
      if (this.isMouseInBounds(x, y)){
        if (scene.mouseover) {
          scene.mouseover.mouseover = false;
        }
        scene.mouseover = this;
        scene.mouseover.mouseover = true;
      }
      else{
        this.mouseover = false;
      }
      // Now check mouseover state for this object's children
      for (var i = 0; i < this.children.length; i++){
        if (this.children[i].isMouseInBounds(x, y)){
          if (scene.mouseover) {
            scene.mouseover.mouseover = false;
          }
          scene.mouseover = this.children[i];
          scene.mouseover.mouseover = true;
        }
        else{
          this.children[i].mouseover = false;
        }
        this.children[i].checkMouseover(x, y);
      }
    }
  };
  this.isMouseInBounds = function(x, y){};
  this.click = function(){};
  this.addChild = function(object){
    object.parent = this;
    this.children.push(object);
  };
  this.dispose = function(){
    for (var i = 0; i < this.children.length; i++){
      this.children[i].dispose();
    }
    var index = this.parent.children.indexOf(this);
    this.parent.children.splice(index, 1);
  };
  this.show = function(){
    this.visible = true;
  };
  this.hide = function(){
    this.visible = false;
  };
}


// Simple single-image sprite
SpriteSimple.prototype = new Entity();
SpriteSimple.constructor = SpriteSimple;

function SpriteSimple(x, y, imagePath){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.image = new Image();
  this.image.src = imagePath + "?" + version;

  // Methods
  this.render = function(context){
    if (this.visible){
      context.drawImage(this.image, this.x, this.y);
      for (var i = 0; i < this.children.length; i++){
        this.children[i].render(context);
      }
    }
  };

  this.isMouseInBounds = function(x, y){
    if (this.visible)
      return (x >= this.x) && (y >= this.y) && (x < this.x + this.image.width) && (y < this.y + this.image.height);
    else
      return false;
  };
}


// Animated multi-image sprite
SpriteAnimated.prototype = new Entity();
SpriteAnimated.constructor = SpriteAnimated;

function SpriteAnimated(x, y, imagePaths){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.frame = 0;
  this.frames = new Array();
  for (var i = 0; i < imagePaths.length; i++){
    if (imagePaths[i].indexOf('.mp4') !== -1){
      var video = document.createElement('video');
      video.src = imagePaths[i] + "?" + version;
      video.autoplay = true;
      video.muted = true;
      video.controls = false;
      video.loop = true;
      this.frames.push(video);
    }
    else{
      var image = new Image();
      image.src = imagePaths[i] + "?" + version;
      this.frames.push(image);
    }
  }

  // Methods
  this.render = function(context){
    if (this.frames.length > this.frame){
      context.drawImage(this.frames[this.frame], this.x, this.y);
    }
    for (var i = 0; i < this.children.length; i++){
      this.children[i].render(context);
    }
  };

  this.isMouseInBounds = function(x, y){
    return (x >= this.x) && (y >= this.y) && (x < this.x + this.frames[this.frame].width) && (y < this.y + this.frames[this.frame].height);
  };
}


// Image object for overlays
ImageSimple.prototype = new Entity();
ImageSimple.constructor = ImageSimple;

function ImageSimple(x, y, imagePath){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.image = new Image();
  this.image.src = imagePath + "?" + version;

  // Methods
  this.render = function(context){
    context.drawImage(this.image, this.x, this.y);
    for (var i = 0; i < this.children.length; i++){
      this.children[i].render(context);
    }
  };

  this.isMouseInBounds = function(x, y){
    return false;
  };
}


// Image object for overlays
RectangleSimple.prototype = new Entity();
RectangleSimple.constructor = RectangleSimple;

function RectangleSimple(x, y, width, height, color){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.width = width;
  this.height = height;
  this.color = color;

  // Methods
  this.render = function(context){
    if (this.visible){
      context.fillStyle = color;
      context.fillRect(this.x, this.y, this.width, this.height);
      for (var i = 0; i < this.children.length; i++){
        this.children[i].render(context);
      }
    }
  };

  this.isMouseInBounds = function(x, y){
    return false;
  };
}


// Text object for overlays
TextSimple.prototype = new Entity();
TextSimple.constructor = TextSimple;

function TextSimple(x, y, text, width, height){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.text = text;
  this.color = "black";
  this.wrap = null;
  if (width != null & height != null){
    this.wrap = [width, height, 0];
  }

  // Methods
  this.render = function(context){
    png_font.drawText(this.text, [x, y], this.color, null, null, this.wrap);
  };

  this.isMouseInBounds = function(x, y){
    return false;
  };
}


// Clickable text object for overlays
TextClickable.prototype = new Entity();
TextClickable.constructor = TextClickable;

function TextClickable(x, y, text){
  // Initialize
  Entity.call(this, x, y);

  // Properties
  this.text = text;
  this.color = "black";

  // Methods
  this.render = function(context){
    png_font.drawText(this.text, [x, y], this.color);
  };

  this.isMouseInBounds = function(x, y){
    return (x >= this.x) && (y >= this.y) && (x < this.x + (this.text.length * 8)) && (y < this.y + 16);
  };
}


// Full page blank overlay
OverlaySimple.prototype = new Entity();
OverlaySimple.constructor = OverlaySimple;

function OverlaySimple(title){
  // Initialize
  Entity.call(this, 0, 0);

  // Properties
  this.tooltip = title;

  // Default children
  this.closeButton = new SpriteSimple(300, 3, 'img/overlay-button-close.png');
  this.closeButton.click = function(){
    this.parent.dispose();
  };
  this.closeButton.tooltip = "Close";
  this.addChild(this.closeButton);

  // Methods
  this.render = function(context){
    scene.context.fillStyle = "black";
    scene.context.fillRect(11, 11, 298, 178);
    scene.context.fillStyle = "white";
    scene.context.fillRect(12, 12, 296, 176);
    for (var i = 0; i < this.children.length; i++){
      this.children[i].render(context);
    }
    this.closeButton.render(context); // Technically this renders twice, but it ensures it's on top
  };

  this.isMouseInBounds = function(x, y){
    return true;
  };
}


// Full page image overlay
OverlayImage.prototype = new Entity();
OverlayImage.constructor = OverlayImage;

function OverlayImage(title, imagePath){
  // Initialize
  Entity.call(this, 0, 0);

  // Properties
  this.tooltip = title;
  this.image = new Image();
  this.image.src = imagePath + "?" + version;

  // Default children
  this.closeButton = new SpriteSimple(300, 3, 'img/overlay-button-close.png');
  this.closeButton.click = function(){
    this.parent.dispose();
  };
  this.closeButton.tooltip = "Close";
  this.addChild(this.closeButton);

  // Methods
  this.render = function(context){
    context.drawImage(this.image, 0, 0);
    for (var i = 0; i < this.children.length; i++){
      this.children[i].render(context);
    }
  };

  this.isMouseInBounds = function(x, y){
    return true;
  };
}


// Full page paginated blank overlay
OverlayPaginated.prototype = new Entity();
OverlayPaginated.constructor = OverlayPaginated;

function OverlayPaginated(title, overlays){
  // Initialize
  Entity.call(this, 0, 0);

  // Properties
  this.page = 0;
  this.pages = new Array();
  for (var i = 0; i < overlays.length; i++){
    overlays[i].closeButton.click = function(){
      this.parent.parent.dispose();
    };
    overlays[i].tooltip = title + " (" + (i+1) + "/" + overlays.length + ")"
    this.pages.push(overlays[i]);
  }

  // Methods
  this.render = function(context){
    scene.context.fillStyle = "black";
    scene.context.fillRect(11, 11, 298, 178);
    scene.context.fillStyle = "white";
    scene.context.fillRect(12, 12, 296, 176);
    for (var i = 0; i < this.children.length; i++){
      this.children[i].render(context);
    }
  };

  this.isMouseInBounds = function(x, y){
    return true;
  };

  this.setPage = function(page){
    this.children = new Array();
    this.addChild(this.pages[page]);
    this.page = page;

    if (page > 0){
      var prevButton = new SpriteSimple(272, 170, 'img/overlay-button-previous.png');
      prevButton.click = function(){
        this.parent.setPage(this.parent.page - 1);
      };
      prevButton.tooltip = "Previous";
      this.addChild(prevButton);
    }

    if (page < this.pages.length - 1){
      var nextButton = new SpriteSimple(290, 170, 'img/overlay-button-next.png');
      nextButton.click = function(){
        this.parent.setPage(this.parent.page + 1);
      };
      nextButton.tooltip = "Next";
      this.addChild(nextButton);
    }
  };

  // Set the first page
  this.setPage(0);
}


// Simple left-right scene navigation
NavigationSimple.prototype = new Entity();
NavigationSimple.constructor = NavigationSimple;

function NavigationSimple(views){
  // Initialize
  Entity.call(this, 0, 0);

  // Properties
  this.view = 0;
  this.views = views;
  for (var i = 0; i < views.length; i++){
    this.addChild(views[i]);
  }

  var leftButton = new SpriteSimple(0, 130, 'img/nav-button-left.png');
  leftButton.click = function(){
    if (this.parent.view > 0){
      this.parent.view--;
      leftButton.parent.setView(this.parent.view);
    }
  };
  leftButton.tooltip = "Turn Left";
  this.addChild(leftButton);
  this.leftButton = leftButton;

  var rightButton = new SpriteSimple(304, 130, 'img/nav-button-right.png');
  rightButton.click = function(){
    if (this.parent.view < this.parent.views.length){
      this.parent.view++;
      rightButton.parent.setView(this.parent.view);
    }
  };
  rightButton.tooltip = "Turn Right";
  this.addChild(rightButton);
  this.rightButton = rightButton;

  // Methods
  this.isMouseInBounds = function(x, y){
    return false;
  };

  this.setView = function(view){
    this.view = view;
    for (var i = 0; i < this.views.length; i++){
      if (i == view)
        this.views[i].show();
      else
        this.views[i].hide();
    }
    if (view > 0)
      this.leftButton.show();
    else
      this.leftButton.hide();
    if (view < this.views.length-1)
      this.rightButton.show();
    else
      this.rightButton.hide();
  };

  // Set the first page
  this.setView(0);
}
