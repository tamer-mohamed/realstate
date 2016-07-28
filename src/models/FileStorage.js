import firebase from 'firebase';
import q from 'q';
import _ from 'lodash';

const Storage = (function(){

  function makeId(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  return {
    upload: function(ref, files, {onUpdate, onSuccess}){
      let storage = firebase.storage().ref(ref);
      let fileNames = [];
      let promises = [];

      console.log('Files to upload', files);

      _(files).forEach(function(file, i){
        let fileName = makeId();
        let uploadTask = storage.child(fileName).put(file, {contentType: file.type});
        let promise = q.defer();

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          if(onUpdate)
            onUpdate(progress);

          console.log('Upload is ' + progress + '% done');
        }, function(error){
          // Handle unsuccessful uploads
          promise.reject(error.code);
        }, ()=>{

          fileNames.push(fileName);
          console.log('Uploaded Filename', fileName);
          promise.resolve(fileName);
        });

        promises.push(promise.promise);
      });

      q.all(promises).then(()=>{
        onSuccess(fileNames);
      })

    },
    delete: function(ref){
      return firebase.storage().ref(ref).delete();
    }
  }
})();

export default Storage;
