$(function() {

  var myDropzone = new Dropzone("div#droparea", {
    url: "/uploadajax",
    method: "POST", // can be changed to "put" if necessary
    maxFilesize: 2, // in MB
    paramName: "file", // The name that will be used to transfer the file
    uploadMultiple: true, // This option will also trigger additional events (like processingmultiple).
    headers: {
      "My-Awesome-Header": "header value"
    },
    addRemoveLinks: false, // add an <a class="dz-remove">Remove file</a> element to the file preview that will remove the file, and it will change to Cancel upload
    previewsContainer: "#previewsContainer",
    clickable: "#selectImage",
    createImageThumbnails: true,
    maxThumbnailFilesize: 2, // in MB
    thumbnailWidth: 300,
    thumbnailHeight: 300,
    maxFiles: 3,
    acceptedFiles: "image/png, image/jpeg, image/gif", //This is a comma separated list of mime types or file extensions.Eg.: image/*,application/pdf,.psd.
    autoProcessQueue: false, // When set to false you have to call myDropzone.processQueue() yourself in order to upload the dropped files. 
    forceFallback: false,

    init: function() {
      console.log("init");
    },
    resize: function(file) {
      console.log("resize");
      /*
       * Crop rectangle range
       * Those values are going to be used by ctx.drawImage().
       */ 
      return {"srcX":0, "srcY":0, "srcWidth":300, "srcHeight":300}
    },
    accept: function(file, done) {
      console.log("accept");
      done();
    },
    fallback: function() {
      console.log("fallback");
    }
  });

  /*
   * Custom preview template here.
   * ex) myDropzone.options.previewTemplate = '';
   */
  // myDropzone.options.previewTemplate = '\
  //   <div class="dz-preview dz-file-preview">\
  //     <div class="dz-details">\
  //     <div class="dz-filename"><span data-dz-name></span></div>\
  //     <div class="dz-size" data-dz-size></div>\
  //     <img data-dz-thumbnail />\
  //   </div>\
  //   <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\
  //   <div class="dz-error-message"><span data-dz-errormessage></span></div>\
  //   </div>';
  myDropzone.options.previewTemplate = '\
    <div class="dz-preview dz-file-preview">\
      <div class="dz-details">\
      <img data-dz-thumbnail />\
    </div>\
    <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\
    <div class="dz-error-message"><span data-dz-errormessage></span></div>\
    </div>';


  /*
   * Available Events
   */ 

  /* receive the "event" as first parameter */
  myDropzone.on("drop", function(event){
    console.log(event.type);
    console.log(event)
  });
  myDropzone.on("dragstart", function(event){ console.log(event.type); });
  myDropzone.on("dragend", function(event){ console.log(event.type); });
  myDropzone.on("dragenter", function(event){ console.log(event.type); });
  myDropzone.on("dragover", function(event){ console.log(event.type); });
  myDropzone.on("dragremove", function(event){ console.log(event.type); });

  /* receive the "file" as first parameter */
  myDropzone.on("addedfile", function(file) {
    console.log("addedfile");
    console.log(file);
    $('#fileSubmit').click(function(){
        myDropzone.processQueue(); //processes the queue
    });
  });
  myDropzone.on("removedfile", function(file) { console.log("removedfile"); });
  myDropzone.on("selectedfiles", function(file) { console.log("selectedfiles"); });
  myDropzone.on("thumbnail", function(file) { console.log("thumbnail"); });
  myDropzone.on("error", function(file) { console.log("error"); });
  myDropzone.on("processing ", function(file) { console.log("processing "); });
  myDropzone.on("uploadprogress", function(file) { console.log("uploadprogress"); });
  myDropzone.on("sending", function(file) { console.log("sending"); });
  myDropzone.on("success", function(file) { console.log("success"); });
  myDropzone.on("complete", function(file) { console.log("complete"); });
  myDropzone.on("canceled", function(file) { console.log("canceled"); });
  myDropzone.on("maxfilesreached", function(file) { console.log("maxfilesreached"); });
  myDropzone.on("maxfilesexceeded", function(file) { console.log("maxfilesexceeded"); });

  /* receive a "list of files" as first parameter
   * only called if the uploadMultiple option is true:
   */
  myDropzone.on("processingmultiple", function(files) { console.log("processingmultiple") });
  myDropzone.on("sendingmultiple", function(files) { console.log("sendingmultiple") });
  myDropzone.on("successmultiple", function(files) { console.log("successmultiple") });
  myDropzone.on("completemultiple", function(files) { console.log("completemultiple") });
  myDropzone.on("canceledmultiple", function(files) { console.log("canceledmultiple") });

  /* Special events */
  myDropzone.on("totaluploadprogress", function() { console.log("totaluploadprogress") });
  myDropzone.on("reset", function() { console.log("reset") });

});
