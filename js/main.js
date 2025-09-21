const SENTAKUSI_MAX_COUNT = 5;
const MONDAI_COUNT = 5;
const MAX_RETRY_COUNT = 100;

let correctSENTAKUSIIndex = 0;

let currentQuestionNumber = 0;

let correctCount = 0;

let questionInfoArray = [
  //モック
  {
    isSeikai: false,
    isDone: false,
  },
  {
    isSeikai: false,
    isDone: false,
  },
  {
    isSeikai: false,
    isDone: false,
  },
];

let itemMaxCount = 0;
let categoryMaxCount = 0;
let currentPokemon = 0;
// let questionsArray = [
//   // もっくかっていうらしい
//   [
//     {
//       id: 74,
//       name: "きいろいかけら",
//       flavor:
//         "黄色い　小さな　かけら。\n昔に　つくられた　なにかの\n道具の　一部らしい。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/yellow-shard.png",
//       categoryName: "collectibles",
//     },
//     {
//       id: 71,
//       name: "あさせのかいがら",
//       flavor: "浅瀬の洞穴で\nみつけた　貝殻。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/shoal-shell.png",
//       categoryName: "collectibles",
//     },
//   ],
//   [
//     {
//       id: 241,
//       name: "きいろのバンダナ",
//       flavor:
//         "持たせて　コンテストに　参加すると\nその　ポケモンは　いつもより\nたくましく　みられる。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/yellow-scarf.png",
//       categoryName: "scarves",
//     },
//     {
//       id: 242,
//       name: "あおのバンダナ",
//       flavor:
//         "持たせて　コンテストに　参加すると\nその　ポケモンは　いつもより\nたくましく　みられる。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/blue-scarf.png",
//       categoryName: "scarves",
//     },
//   ],
//   [
//     {
//       id: 939,
//       name: "ホノオＺ",
//       flavor:
//         "ほのおタイプの　技を\nＺワザに　グレードアップする\nＺパワーの　結晶を　作りだす。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/firium-z--bag.png",
//       categoryName: "unused",
//     },
//     {
//       id: 986,
//       name: "むらさきはなびら",
//       flavor:
//         "マツリカの試練で　クチナシから\nもらえる　はなびらの　押し花。\n７種類　集めるのが　目的。",
//       img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/purple-petal.png",
//       categoryName: "unused",
//     },
//   ],
// ];
let questionsArray = [];

//870~876抜けてる
//次回やること
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 画像ないもの→代わりの画像
// 何問目か表示
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 結果発表アラートじゃなくやりたい
// 正誤判定もアラートじゃなくやりたい
// ボタンにホバーとかつける
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 選択肢１つくる
// ランダムNo
// ポケモンfetch
// チェック
// カテゴリー取得
// ↓
// 配列シャッフル
// 上から順にチェック
// 使えるなら選択肢へ
// 使えないなら入れずに二番目以降を
// 選択肢数足りたら
// 戻る
// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// ロード遅い問題 → バッチ処理？
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 結果発表
// cssなど
// 画像の表示、非表示
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 選択肢を選択できるようにする
// 正誤判定
// 回答済みの判定
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 問題を出す（決める）
// 選択肢を表示する
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 正規表現でわざましーんなどスキップ（数字入ってるやつ全部抜く）
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// フレーバーとか必要なものがなかったら無視できるようにする
// ↑現在直指定
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// リトライ数多かったら別のカテゴリーのに変える
//ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// https://pokeapi.co/api/v2/item-category/?offset=0&limit=100000
// 選択肢を同じカテゴリーの物で作る
// カテゴリー範囲変わってもできる

// 最終的にはーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
// 一番上に特徴文章
// 選択肢3→5つ（ボタン）
// ↓選ぶ
// 回答出す
// 正解数カウント
// 次へ
// リピート(3)

function displayPokemon(questionObject) {
  correctSENTAKUSIIndex = getRandomNumber(questionObject.length) - 1;
  const sentakusi = document.getElementById("sentakusi");
  const text = document.getElementById("display-answer");
  const answerImg = document.getElementById("answer-img");
  const img = document.getElementById("pokemon-img");
  const btn = document.getElementById("next");
  text.classList.add("hide");
  answerImg.classList.add("hide");
  answerImg.classList.remove("right");
  answerImg.classList.remove("wrong");
  img.classList.add("hide");
  btn.classList.add("hide");

  document.getElementById("pokemon-img").src =
    questionObject[correctSENTAKUSIIndex]?.img;

  while (sentakusi.firstChild) {
    sentakusi.removeChild(sentakusi.firstChild);
  }

  for (let i = 0; i < questionObject.length; i++) {
    const a = document.createElement("a");
    const br = document.createElement("br");
    sentakusi.appendChild(a);
    sentakusi.appendChild(br);

    a.classList.add("sentakusi");
    a.id = `pokemon-name-${i}`;
    a.setAttribute("href", "#");
    document.getElementById(`pokemon-name-${i}`).textContent =
      questionObject[i].name;
  }

  document.getElementById("pokemon-flavor-text").textContent =
    questionObject[correctSENTAKUSIIndex]?.flavor;

  const sentakusis = document.getElementsByClassName("sentakusi");

  for (let i = 0; i < sentakusis.length; i++) {
    sentakusis[i].addEventListener("click", function (e) {
      const clickedId = e.target.id;
      console.log(questionInfoArray);
      if (questionInfoArray[currentQuestionNumber].isDone == false) {
        if (questionObject[correctSENTAKUSIIndex]?.img !== null) {
          img.classList.remove("hide");
        }
        btn.classList.remove("hide");
        let a = document.getElementById(
          `pokemon-name-${correctSENTAKUSIIndex}`
        );
        a.classList.add("correct");

        if (clickedId == `pokemon-name-${correctSENTAKUSIIndex}`) {
          document.getElementById("display-answer").textContent = "正解！";
          answerImg.classList.add("right");
          questionInfoArray[currentQuestionNumber].isSeikai = true;
          correctCount++;
        } else {
          document.getElementById("display-answer").textContent = "不正解";
          answerImg.classList.add("wrong");
        }
        text.classList.remove("hide");
        answerImg.classList.remove("hide");

        questionInfoArray[currentQuestionNumber].isDone = true;
      } else {
        alert("回答済み");
      }
    });
  }
}

async function fetchPokemon(id) {
  console.log("id:" + id);
  let pokemon_data = "";
  try {
    if (id == "") {
      pokemon_data = await fetch(`https://pokeapi.co/api/v2/item`);
    } else {
      pokemon_data = await fetch(id);
    }
  } catch (error) {
    console.error("try catch のエラー" + error);
  }
  const pokemon = await pokemon_data.json();
  return pokemon;
}

async function fetchCategory(categoryName) {
  console.log("categoryName:" + categoryName);
  let pokemon_data = "";
  try {
    if (categoryName == "") {
      pokemon_data = await fetch(
        `https://pokeapi.co/api/v2/item-category?offset=0&limit=60`
      );
    } else {
      pokemon_data = await fetch(
        `https://pokeapi.co/api/v2/item-category/${categoryName}`
      );
    }
  } catch (error) {
    console.error("try catch のエラー" + error);
  }
  const pokemon = await pokemon_data.json();
  return pokemon;
}

function getName(pokemon) {
  const species_name = pokemon.names.find(
    (item) => item.language.name === "ja"
  )?.name;
  return species_name;
}

function getImg(pokemon) {
  let pokemon_img = pokemon["sprites"]["default"];
  return pokemon_img;
}

function getFlavor(pokemon) {
  const pokemon_flavor_text = pokemon.flavor_text_entries.find(
    (item) => item.language.name === "ja"
  )?.text;
  return pokemon_flavor_text;
}

function getItems(pokemon) {
  let pokemon_items = pokemon["items"];
  return pokemon_items;
}

function getCategoryName(pokemon) {
  let pokemon_category_name = pokemon["category"]["name"];
  return pokemon_category_name;
}

function getItemTotalCount(pokemon) {
  let pokemon_item_total_count = pokemon["count"];
  return pokemon_item_total_count;
}

function getCategoryTotalCount(pokemon) {
  let pokemon_Category_total_count = pokemon["count"];
  return pokemon_Category_total_count;
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

//次回ここから　配列にする　中身はオブジェクトでid,name,img,特徴　被らないようにする
async function makeQuestion() {
  let pokemon = await fetchPokemon("");
  itemMaxCount = getItemTotalCount(pokemon);
  categoryMaxCount = getCategoryTotalCount(await fetchCategory(""));
  console.log("categoryMaxCount : " + categoryMaxCount);

  for (let i = 0; i < MONDAI_COUNT; i++) {
    let questionInfoObject = {
      isSeikai: false,
      isDone: false,
    };

    questionInfoArray[i] = questionInfoObject;

    let j = 0;
    let questionArray = [
      {
        id: 0,
        name: "",
        flavor: "",
        img: "",
        categoryName: "",
      },
    ];

    let randomNumber = getRandomNumber(categoryMaxCount - 3);

    while (randomNumber == 31) {
      randomNumber = getRandomNumber(categoryMaxCount - 3);
    }

    console.log("randomNum : " + randomNumber);
    //category 決める
    let sameCategory = await fetchCategory(randomNumber);
    //objectの集まり持ってくる
    let items = getItems(sameCategory);
    // objectの集まりからitemsの集まりだけとってくる
    let shuffledItems = items.slice().sort(() => Math.random() - 0.5);
    console.log("items.length : " + items.length);
    console.log(
      "--------------------------------------------------------------"
    );

    let SENTAKUSI_Array = [];

    // shuffledItems 上から調べる（使えるやつ上から入れててく）

    let isRoop =
      SENTAKUSI_Array.length > SENTAKUSI_MAX_COUNT || 0 == shuffledItems.length;

    while (
      SENTAKUSI_Array.length < SENTAKUSI_MAX_COUNT &&
      0 < shuffledItems.length
    ) {
      let itemOne = await fetchPokemon(shuffledItems[0].url);
      let name = getName(itemOne);
      let flavor = getFlavor(itemOne);
      let img = getImg(itemOne);
      if (!itemOne || !name || !flavor) {
        console.log("使えん");
      } else {
        let questionObject = {
          name: name,
          flavor: flavor,
          img: img,
        };

        SENTAKUSI_Array.push(questionObject);
      }
      shuffledItems.shift();
    }

    if (SENTAKUSI_Array.length !== 0) {
      questionsArray[i] = SENTAKUSI_Array;
    } else {
      i--;
    }

    console.log(`問題数：${i}
      `);
  }

  const loading = document.querySelector("#loading");
  loading.classList.add("loaded");

  displayPokemon(questionsArray[0]);

  console.log(questionsArray);
}

//
// イベントリスナー
//

document.getElementById("next").addEventListener("click", () => {
  currentQuestionNumber += 1;
  if (currentQuestionNumber > questionsArray.length - 1) {
    let zukan = document.getElementById("zukan");
    let result = document.getElementById("result");
    let correctCountEl = document.getElementById("correct-count");
    let progress = document.getElementById("progress");
    console.log(correctCountEl);
    correctCountEl.textContent = correctCount;
    zukan.classList.add("hide");
    progress.classList.add("hide");
    result.classList.remove("hide");
    // alert("終了！" + `正解数は${MONDAI_COUNT}問中${correctCount}問！`);
  } else {
    let currentNum = document.getElementById("current-num");
    currentNum.textContent = currentQuestionNumber + 1;
    displayPokemon(questionsArray[currentQuestionNumber]);
  }
});

async function setItemCount() {
  let pokemon = await fetchPokemon("");
  itemMaxCount = getItemTotalCount(pokemon);
}

makeQuestion();

console.log(questionsArray);

let maxNum = document.getElementById("max-num");
maxNum.textContent = MONDAI_COUNT;
