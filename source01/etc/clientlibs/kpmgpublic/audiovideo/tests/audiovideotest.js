/**
Test Suite for AudioVideo component
*/
define(['jquery', '/base/source/etc/clientlibs/kpmgpublic/audiovideo/js/audiovideo.js'], function($, AudioVideo){
  describe('AudioVideo test suite', function(){
    //
    it('Audio Video initialization test case', function(){
      var audioVideo = new AudioVideo(null);
      expect(audioVideo).not.to.be.null;
    })
    //
  })
});
