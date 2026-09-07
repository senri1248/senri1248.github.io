(function() {
  // 1. 创建播放器的 HTML 容器
  var playerContainer = document.createElement('div');
  playerContainer.id = 'ink-player';
  // 给它一个吸底或者悬浮的初始样式
  playerContainer.style.cssText = 'position:fixed; left:20px; bottom:20px; z-index:99999; width:300px;';
  
  // 创建配套的拖动头部条
  var playerHead = document.createElement('div');
  playerHead.className = 'ink-player-head';
  playerHead.style.cssText = 'height:20px; background:#333; color:#fff; font-size:11px; text-align:center; cursor:move; line-height:20px; border-radius:4px 4px 0 0;';
  playerHead.innerHTML = '🎵 拖动播放器：<span id="ink-song-title">暂无歌曲</span>';
  
  playerContainer.appendChild(playerHead);
  
  // 创建 APlayer 实际绑定的空节点
  var aplayerDiv = document.createElement('div');
  aplayerDiv.id = 'aplayer-inside';
  playerContainer.appendChild(aplayerDiv);
  
  document.body.appendChild(playerContainer);

  // 2. 实例化播放器并放入你想听的歌曲
  var ap = new APlayer({
    element: document.getElementById('aplayer-inside'),
    fixed: false,          // 不使用官方自带的全宽吸底，用你这段支持拖拽的样式
    lrcType: 0,            // 0 代表不展示歌词，想加歌词可以改
    audio: [
      {
        name: '歌曲名字1',
        artist: '歌手1',
        url: 'https://example.com', // 这里放你歌曲的真实网络音频链接
        cover: '/img/pan.jpg'                 // 歌曲封面
      },
      {
        name: '歌曲名字2',
        artist: '歌手2',
        url: 'https://example.com',
        cover: '/img/pan.jpg'
      }
    ]
  });
})();