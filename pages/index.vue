<template>
  <nav class="testNav">
    <ul class="rowNav">
      <li><a href="/">HOME</a></li>
      <li><a href="/gsapcode">GSAP CODE</a></li>
      <li><a href="/row">row index</a></li>
      <li><a href="/row/title1">RootTest1</a></li>
    </ul>
    <div class="pageIntro">
      <p>
        ページリンクのテストです。link
        toで繋ぐと何故かjsが効かないのでhref属性を使いました。<br />componentsでパーツ化したTestNavからメニューを入れています。pagesからのルートパスでファイル名に拡張子は付けず、リンクを貼っています。
      </p>
	  <a href="/formsamplelist">リンク</a>
    </div>
  </nav>
</template>