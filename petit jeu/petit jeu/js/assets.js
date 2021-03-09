function loadAssets(callback) {
    // here we should load the souds, the sprite sheets etc.
    // then at the end call the callback function
    let image1 = new Image;
    image1.src ="./assets/images/start.JPG";

    let image2 = new Image;
    image2.src = "./assets/images/avion.JPG";

    let assets =[];
    assets.push(image1);
    assets.push(image2);

    callback(assets);

    // loadAssetsUsingHowlerAndNoXhr(assetsToLoadURLs, callback);
  }