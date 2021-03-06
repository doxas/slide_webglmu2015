#### はじめに

名前：杉本 雅広（すぎもと まさひろ）

運営中： <a href="http://wgld.org/" target="_blank">wgld.org</a>, <a href="http://webgl.souhonzan.org/" target="_blank">WebGL 総本山</a>

<a target="_blank" href="https://twitter.com/h_doxas">@h_doxas | Twitter</a>

![doxas](sample.png)

---

#### 本日のテーマ

**なにが変わるの WebGL 2.0**

2011年に WebGL 1.0 が登場して以来、長らく WebGL の API そのものは変化していません。現行の WebGL でさえ、使いこなせる人はまだまだ少ない状況ですが、いずれやってくる WebGL 2.0 の時代に向けて、アンテナを張っておくことは無駄にはならないでしょう。

---

#### 本日のテーマ

今回は詳細についてはいろいろ省略しますが、ざっくりと、WebGL 2.0 についてお話ししようと思います。
<span class="capt">あんまり細かいことには触れません！</span>

---

#### agenda

* WebGL と OpenGL ES の関係おさらい
* WebGL 2.0 の代表的なトピック
* GLSL ES 3.0 でシェーダはどう変わるのか

---

#### WebGL と OpenGL ES

WebGL 1.0 は、OpenGL ES 2.0 がベースになっています。
OpenGL ES はモバイル向けの軽量化された OpenGL 実装で、2012年にバージョン 3.0 が発表されています。
WebGL 2.0 は、そんな *OpenGL ES 3.0 がベース* です。

---

#### WebGL と OpenGL ES

OpenGL ES 3.0 は、同 2.0 と比較してかなりいろいろ進化しています。
WebGL もそれに追従する形で、かなり大幅に変更される予定です。
<span class="capt">残念ながら、シェーダは増えません！</span>

---

#### WebGL 2.0 の代表的なトピック

* MRT（Multiple render targets）
* Transform feedback
* instancing
* vertex array object（VAO）

---

#### WebGL 2.0 の代表的なトピック

* uniform block
* sampler object
* 3D texture など

---

#### MRT（Multiple render targets）

一度のドローコールで複数のバッファに同時にレンダリングが行えるという、思わず鼻血が吹き出しそうな機能です。
昨今の最先端 3DCG の世界では、もはや当然のように利用されている技術の代表格ではないでしょうか。
たとえば色と法線を一度に別々のバッファに書き込んだり、といったことができますね。

---

#### Transform feedback

いわゆる GPGPU 的な用途にシェーダを利用することができる機能、というとわかりやすいでしょうか。
あらかじめ登録しておいたバッファに、シェーダ側から値を出力することができます。
シェーダのみでパーティクルの座標を更新してから読み込み直すなど、CPU を介さない処理ができるようになります。鼻血が出ますね。

---

#### instancing

こちらはたった一度のドローコールだけで、モデルを複製して複数レンダリングすることができる機能。
あくまでも同じモデルデータを複製することになるものの、それぞれに位置や回転などは個別に設定できるうえ、ドローコールは一度で済むという、言葉で書くとよくわからない機能かもしれません。

---

#### vertex array object（VAO）

VBO（vertex buffer object）をまとめて管理してくれるオブジェクト。
アレもバインドしてコレもバインドしてというバインド地獄に舞い降りた天使。
VAO を利用すれば VBO 周りのバインド処理は大幅に手間が減ります。

---

#### uniform block

uniform 変数でいわゆる構造体的なことができるようになった、というとわかりやすいと思います。
これは複数のシェーダで共有することができるため「別々のシェーダだけど使ってるベクトル類はどうせ同じものなんだよな」みたいなときに便利になります。

---

#### sampler object

サンプラ、というのはテクスチャに適用するテクスチャパラメータのことですが、これを分離して専門のオブジェクトにした感じです。
たとえば今までは、テクスチャの元画像が同じでも、NEAREST と LINEAR の異なる補間方法を使いたいなら、設定しなおしたりテクスチャオブジェクトを複数用意したりしなければなりませんでした。これがサンプラ部分だけ別のオブジェクトとして管理される形になったわけですね。

---

#### 3D texture など

テクスチャ周りはかなり大幅に変わっています。
3D テクスチャを例に取ると、いわゆる奥行きも加味したボリューム付きデータを扱えるフォーマットということになります。
その他にも 2D の Array みたいなフォーマットもあります。

---

#### GLSL ES 3.0

WebGL が新しいバージョンに格上げになると同時に、当然ながら GLSL も新しくなります。
個人的な意見になってしまいますが、こちらはかなり変わっているところが多いので、WebGL そのものの変化よりも対応するのに慣れが必要そうな感じもします。
<span class="capt">代表的なものだけ紹介します。</span>

---

#### GLSL ES 3.0

* データ型関連
* attribute と varying
* ビルトイン変数
* ビルトイン関数
* その他

---

#### データ型関連

3D テクスチャなどのテクスチャフォーマットが増えた分だけ、テクスチャ関連のデータ型が増えています。
テクスチャ関連ではシャドウサンプラ、つまりシャドウマッピング用のフォーマットなんかも追加されています。
また、符号なし整数や、正方行列以外の行列型なども新たに追加されています。鼻血が止まらなくなりそうです。

---

#### attribute と varying

GLSL ES 1.0 で欠かせないものだった attribute と varying が *無くなります*。
代わりに、入力を in で、出力を out で表現するようになります。
たとえば、従来の varying 変数のように頂点シェーダからフラグメントシェーダにデータを渡すなら、頂点シェーダで out して、フラグメントシェーダで in するわけですね。

---

#### ビルトイン変数

ビルトインの変数も大幅に変更されています。たとえばフラグメントシェーダの出力は、GLSL ES 1.0 では `gl_FragColor` などを使っていましたが、これが自分で定義した out 修飾子付き変数を利用しないといけなかったりします。
深度値を書き出すための専用ビルトイン変数 `gl_FragDepth` なども追加されているもののひとつですね。ほかにもシェーダ内で頂点インデックスを参照したりできます。

---

#### ビルトイン関数

こちらもかなり量が多いです。
四捨五入を行う `round` や、絶対値での floor を返す `tranc`、双曲線関数系のほかに行列系の関数なんかもあります。
正直なところ、どう使えば効果的なのかわからないものも含め、かなりいっぱいあるので覚えるのが大変そうです。

---

#### その他

その他には、フラグメントシェーダで highp がデフォルトになっていたり、フラットシェーディングを既定でサポートしていたり、細かいところではまだまだたくさんのトピックがあります。
ただ、GLSL ES 1.0 との互換性は個人的な印象としては無いに等しい感じもするので、慣れるまで最初は大変そうです。
<span class="capt">たぶんすぐ慣れちゃうと思いますけど……</span>

---

#### その他

ちなみに使い分けるための指定方法としては、シェーダ内でバージョン指定して 3.0 を使うか、何も指定せずに 1.0 を使うか、という感じになると思われます。
ただ、GLSL の 1.0 側でサポートされていない機能は WebGL 2.0 側でも使えなくなるわけで、どのみち新しい機能をバシバシ使っていくためにも、新しい GLSL に関してもお勉強必要かなと思います。

---

#### 最後に

WebGL 2.0 はまだまだ使える環境自体が少ない、安定して動かない、というところがあるので、もし興味のある人は OpenGL ES 3.0 を軸に先行して調べてみたりする必要があるでしょう。
いつの日かやってくる WebGL 2.0 時代に向けて、せめて「どんなことができるようになるのか」だけでも理解しておくと、きっと幸せになれるのかなと思います。
<span class="capt">私もがんばってお勉強しようと思います！</span>

---

#### お役立ちリンク

* <a href="https://www.khronos.org/registry/webgl/specs/latest/2.0/">WebGL 2 Specification</a>
* <a href="http://blog.tojicode.com/2013/09/whats-coming-in-webgl-20.html">TojiCode: What&apos;s coming in WebGL 2.0</a>
* <a href="https://www.khronos.org/files/opengles3-quick-reference-card.pdf">opengles3-quick-reference-card.pdf</a>
* <a href="https://www.khronos.org/registry/gles/specs/3.0/GLSL_ES_Specification_3.00.3.pdf#nameddest=section-1.5">GLSL_ES_Specification_3.00.3.pdf</a>

---

