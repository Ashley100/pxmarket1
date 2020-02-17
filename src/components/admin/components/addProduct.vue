<template>
  <div id="addProduct">
    <div class="columns">
      <div class="column is-full">
        <span class="tag is-link is-large">Создание карточки товара</span>
        <div class="field">
          <!-- Title -->
          <div class="column px-column">
            <label class="label">Назмание (Title)</label>
            <div class="control">
              <input
                @input="convertUrl"
                v-model.trim="addState.title"
                class="input is-info is-rounded"
                type="text"
                placeholder="название"
              />
              <span class="tag is-rounded" style="margin-top: 10px;">url: {{this.addState.url}}</span>
            </div>
          </div>
          <!-- Categories -->
          <div class="column px-column">
            <label class="label">Категория товара</label>

            <div
              class="dropdown px-dd-categories"
              :class="{'is-active': this.bodyState.categoriesDropDown}"
              @click="categoriesClick()"
            >
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>{{this.addState.currentCategory.name}}</span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a
                    href="#"
                    class="dropdown-item"
                    v-for="(cat, index) in this.categories"
                    :key="index"
                    :data-catId="cat.id"
                    @click="bodyClick($event)"
                  >{{cat.name}}</a>

                  <!-- <a href="#" class="dropdown-item">With a divider</a> -->
                </div>
              </div>
            </div>
          </div>
          <!-- Price -->
          <div class="column px-column">
            <h6 class="title is-6">
              <b>Укажите цену товара</b>
            </h6>Новая цена
            <div class="field has-addons has-addons-centered">
              <p class="control">
                <input
                  v-model="addState.price.new"
                  class="input"
                  type="text"
                  placeholder="Укажите цену товара"
                />
                <!-- Из-за .number вылазят ошибки с таймером с консоли -->
              </p>
              <p class="control">
                <span class="select">
                  <select>
                    <option>руб</option>
                    <!-- <option>£</option>
                    <option>€</option>-->
                  </select>
                </span>
              </p>
            </div>Старая цена
            <div class="field has-addons has-addons-centered">
              <p class="control">
                <input
                  v-model="addState.price.old"
                  class="input"
                  type="text"
                  placeholder="Укажите цену товара"
                />
                <!-- Из-за .number вылазят ошибки с таймером с консоли -->
              </p>
              <p class="control">
                <span class="select">
                  <select>
                    <option>руб</option>
                    <!-- <option>£</option>
                    <option>€</option>-->
                  </select>
                </span>
              </p>
            </div>
          </div>
          <!-- Colors -->
          <div class="column px-column">
            <h6 class="title is-6">
              <b>Укажите цвета присутствующие у торава</b>
            </h6>
            <div class="column">
              <span
                v-for="(color, index) in colors"
                :key="index"
                class="tag px-colors animated fadeIn"
                :class=" 'is-' + color"
                @click="choiceColors(color)"
              >{{color}}</span>
            </div>
            <div class="column">
              <span class="tag is-medium px-tag-fix">Вы выбрали:</span>
              <span
                v-for="(color, index) in this.addState.colors"
                :key="index"
                class="tag px-colors animated fadeIn"
                :class=" 'is-' + color"
                @click="deleteColors(color)"
              >
                {{color}}
                <a class="delete"></a>
              </span>
            </div>
          </div>
          <!-- Size -->
          <div class="column px-column">
            <h6 class="title is-6">
              <b>Укажите размер товара</b>
            </h6>
            <div class="column">
              <span
                v-for="(siz, index) in size"
                :key="index"
                class="tag is-medium is-blue px-colors animated fadeIn"
                @click="choiceSize(siz)"
              >{{siz}}</span>
            </div>
            <div class="column">
              <span class="tag is-medium px-tag-fix">Вы выбрали:</span>
              <span
                v-for="(siz, index) in addState.size"
                :key="index"
                class="tag is-medium px-colors animated fadeIn"
                @click="deleteSize(siz)"
              >
                {{siz}}
                <a class="delete"></a>
              </span>
            </div>
          </div>
          <!-- Material -->
          <div class="column px-column">
            <h6 class="title is-6">
              <b>Укажите материал товара</b>
            </h6>
            <div class="column">
              <span
                v-for="(mat, index) in material"
                :key="index"
                class="tag is-medium is-blue px-colors animated fadeIn"
                @click="choiceMaterial(mat)"
              >{{mat}}</span>
            </div>
            <div class="column">
              <span class="tag is-medium px-tag-fix">Вы выбрали:</span>
              <span
                v-for="(mat, index) in addState.material"
                :key="index"
                class="tag is-medium px-colors animated fadeIn"
                @click="deleteMaterial(mat)"
              >
                {{mat}}
                <a class="delete"></a>
              </span>
            </div>
          </div>
          <!-- Deccription -->
          <div class="column px-column">
            <label class="label">Описание товара (description)</label>
            <div class="control">
              <textarea v-model="addState.description" class="textarea" placeholder="Textarea"></textarea>
            </div>
          </div>
          <!--  -->
          <br />
          <!-- Upload Image -->
          <div class="column px-column">
            <label class="label">Загрузите изображения товара</label>

            <img
              class="responsive-img"
              v-for="(img, index) in this.imageSrc"
              :key="index"
              :src="img"
            />

            <!-- <img  class="responsive-img" :src="this.imageSrc[1]"> -->

            <div class="field">
              <div class="file is-info has-name">
                <label class="file-label">
                  <input
                    multiple
                    class="file-input"
                    type="file"
                    name="resume"
                    accept="image/*"
                    @change="OnFileChange"
                  />
                  <span class="file-cta is-blue">
                    <span class="file-icon">
                      <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">Info file…</span>
                  </span>
                  <span class="file-name">Screen Shot 2017-07-29 at 15.54.25.png</span>
                </label>
              </div>
            </div>
          </div>
          <div class="column px-column">
            <label class="label">Прогресс загрузки фото</label>
            <progress class="progress is-link" :value="loadImgProgress" max="100">10%</progress>
          </div>

          <!--  -->
        </div>
        <div class="column px-column">
          <a @click="createProduct()" class="button is-link">Создать товар</a>
          <a @click="clearState()" class="button is-light" style="margin-left: 10px;">Очистить</a>
        </div>
      </div>

      <!-- Example -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageArr: [],
      isSlider: false,
      categories: [],
      addState: {
        title: "",
        url: "",
        price: { new: 0, old: 0 },
        description: "",
        colors: [],
        size: [],
        material: [],
        images: [],
        currentCategory: { name: "Категория не выбранна" }
      },
      colors: [
        "black",
        "dark",
        "light",
        "white",
        "green",
        "palegreen",
        "forestgreen",
        "gold",
        "yellow",
        "coral",
        "red",
        "carmine",
        "maroon",
        "blue",
        "skyblue",
        "ultramarine"
      ],
      size: ["Маленький", "Средний", "Большой"],
      material: ["такнь", "хлопок"],
      image: [],
      imageSrc: [],
      loadImgProgress: 1,
      validator: {
        title: { field: false, error: "Вы не заполнили Заголовок товара!" },
        price: { field: false, error: "Вы не заполнили Цену товара!" },
        color: { field: false, error: "Вы не выбрали Цвет товара!" },
        size: { field: false, error: "Вы не выбрали Размер товара!" },
        material: { field: false, error: "Вы не выбрали Материал товара!" },
        description: {
          field: false,
          error: "Вы не заполнили Описание товара!"
        },
        image: { field: false, error: "Вы не загрузили Фото товара!" },
        category: { field: false, error: "Вы не указали категорию товара!" }
      },
      bodyState: {
        categoriesDropDown: false
      }
    };
  },
  methods: {
    // ==============
    choiceColors(c) {
      if (this.addState.colors.length == 0) {
        this.addState.colors.push(c);
        this.validator.color.field = true;
      }
      for (var i = 0; i < this.addState.colors.length; i++) {
        if (this.addState.colors[i] == c) {
          return false;
        }
      }
      this.addState.colors.push(c);
      this.validator.color.field = true;
    },
    deleteColors(c) {
      for (var i = 0; i < this.addState.colors.length; i++) {
        if (this.addState.colors[i] == c) {
          this.addState.colors.splice(i, 1);
          if (this.addState.colors.length == 0) {
            this.validator.color.field = false;
          }
        }
      }
    },
    // ==============
    choiceSize(s) {
      if (this.addState.size.length == 0) {
        this.addState.size.push(s);
        this.validator.size.field = true;
      }
      for (var i = 0; i < this.addState.size.length; i++) {
        if (this.addState.size[i] == s) {
          return false;
        }
      }
      this.addState.size.push(s);
      this.validator.size.field = true;
    },
    deleteSize(s) {
      for (var i = 0; i < this.addState.size.length; i++) {
        if (this.addState.size[i] == s) {
          this.addState.size.splice(i, 1);
          if (this.addState.size.length == 0) {
            this.validator.size.field = false;
          }
        }
      }
    },
    // ==============
    choiceMaterial(s) {
      if (this.addState.material.length == 0) {
        this.addState.material.push(s);
        this.validator.material.field = true;
      }
      for (var i = 0; i < this.addState.material.length; i++) {
        if (this.addState.material[i] == s) {
          return false;
        }
      }
      this.addState.material.push(s);
      this.validator.material.field = true;
    },
    deleteMaterial(s) {
      for (var i = 0; i < this.addState.material.length; i++) {
        if (this.addState.material[i] == s) {
          this.addState.material.splice(i, 1);
          if (this.addState.material.length == 0) {
            this.validator.material.field = false;
          }
        }
      }
    },
    // ==============

    // ==============
    clearState() {
      // claer all properties in object
      for (const prop of Object.keys(this.addState)) {
        if (typeof this.addState[prop] == "string") {
          this.addState[prop] = "";
        }
        if (typeof this.addState[prop] == "object") {
          if (Array.isArray(this.addState[prop])) {
            this.addState[prop] = [];
            this.imageSrc = [];
          } else {
            this.addState[prop] = "";
            this.image = "";
          }
        }
      }
    },
    createProduct() {
      if (this.addState.title == "") {
        this.validator.title.field = false;
      } else {
        this.validator.title.field = true;
      }
      //
      if (this.addState.price.new == 0 || this.addState.price.old == 0) {
        this.validator.price.field = false;
      } else if (
        this.addState.price.new == "" ||
        this.addState.price.old == ""
      ) {
        this.validator.price.field = false;
      } else if (
        this.addState.price.new == null ||
        this.addState.price.old == null
      ) {
        this.validator.price.field = false;
      } else {
        this.validator.price.field = true;
      }
      //
      if (this.addState.description == "") {
        this.validator.description.field = false;
      } else {
        this.validator.description.field = true;
      }
      if (this.imageSrc.length == 0) {
        this.validator.image.field = false;
      } else {
        this.validator.image.field = true;
      }
      //
      if (
        this.addState.currentCategory === null ||
        this.addState.currentCategory === undefined ||
        this.addState.currentCategory === "Категория не выбранна"
      ) {
        this.validator.category.field = false;
      } else {
        this.validator.category.field = true;
      }
      if (this.validator.title.field == false) {
        // console.log(this.imageSrc)

        return alert(this.validator.title.error);
      } else if (this.validator.price.field == false) {
        return alert(this.validator.price.error);
      } else if (this.validator.color.field == false) {
        return alert(this.validator.color.error);
      } else if (this.validator.size.field == false) {
        return alert(this.validator.size.error);
      } else if (this.validator.material.field == false) {
        return alert(this.validator.material.error);
      } else if (this.validator.description.field == false) {
        return alert(this.validator.description.error);
      } else if (this.validator.image.field == false) {
        return alert(this.validator.image.error);
      } else if (this.validator.category == false) {
        return alert(this.validator.category.error);
      } else {
        this.$store.dispatch("createProduct", this.addState);
      }
      // this.$store.dispatch('createProduct', this.addState)
    },
    // ==============
    convertUrl() {
      var transliterate = function(text) {
        text = text
          .replace(/\u0401/g, "YO")
          .replace(/\u0419/g, "I")
          .replace(/\u0426/g, "TS")
          .replace(/\u0423/g, "U")
          .replace(/\u041A/g, "K")
          .replace(/\u0415/g, "E")
          .replace(/\u041D/g, "N")
          .replace(/\u0413/g, "G")
          .replace(/\u0428/g, "SH")
          .replace(/\u0429/g, "SCH")
          .replace(/\u0417/g, "Z")
          .replace(/\u0425/g, "H")
          .replace(/\u042A/g, "")
          .replace(/\u0451/g, "yo")
          .replace(/\u0439/g, "i")
          .replace(/\u0446/g, "ts")
          .replace(/\u0443/g, "u")
          .replace(/\u043A/g, "k")
          .replace(/\u0435/g, "e")
          .replace(/\u043D/g, "n")
          .replace(/\u0433/g, "g")
          .replace(/\u0448/g, "sh")
          .replace(/\u0449/g, "sch")
          .replace(/\u0437/g, "z")
          .replace(/\u0445/g, "h")
          .replace(/\u044A/g, "'")
          .replace(/\u0424/g, "F")
          .replace(/\u042B/g, "I")
          .replace(/\u0412/g, "V")
          .replace(/\u0410/g, "a")
          .replace(/\u041F/g, "P")
          .replace(/\u0420/g, "R")
          .replace(/\u041E/g, "O")
          .replace(/\u041B/g, "L")
          .replace(/\u0414/g, "D")
          .replace(/\u0416/g, "ZH")
          .replace(/\u042D/g, "E")
          .replace(/\u0444/g, "f")
          .replace(/\u044B/g, "i")
          .replace(/\u0432/g, "v")
          .replace(/\u0430/g, "a")
          .replace(/\u043F/g, "p")
          .replace(/\u0440/g, "r")
          .replace(/\u043E/g, "o")
          .replace(/\u043B/g, "l")
          .replace(/\u0434/g, "d")
          .replace(/\u0436/g, "zh")
          .replace(/\u044D/g, "e")
          .replace(/\u042F/g, "Ya")
          .replace(/\u0427/g, "CH")
          .replace(/\u0421/g, "S")
          .replace(/\u041C/g, "M")
          .replace(/\u0418/g, "I")
          .replace(/\u0422/g, "T")
          .replace(/\u042C/g, "'")
          .replace(/\u0411/g, "B")
          .replace(/\u042E/g, "YU")
          .replace(/\u044F/g, "ya")
          .replace(/\u0447/g, "ch")
          .replace(/\u0441/g, "s")
          .replace(/\u043C/g, "m")
          .replace(/\u0438/g, "i")
          .replace(/\u0442/g, "t")
          .replace(/\u044C/g, "'")
          .replace(/\u0431/g, "b")
          .replace(/\u044E/g, "yu");

        text = text.replace(/  +/g, "");

        return text;
      };
      let url = transliterate(this.addState.title);
      url = url.replace(/ /g, "-").toLowerCase();
      this.addState.url = url;
      return this.addState.url;
    },
    // ==============
    OnFileChange(event) {
      // const file = event.target.files[0]
      const file = [];

      for (let i = 0; i < event.target.files.length; i++) {
        file.push(event.target.files[i]);
      }

      /* eslint-disable no-console */
      console.log(file);
      /* eslint-disable no-console */

      for (let i = 0; i < file.length; i++) {
        const reader = new FileReader();
        reader.onload = e => {
          this.imageSrc.push(reader.result);
          /* eslint-disable no-console */
          console.log('this.imageSrc');
          console.log(this.imageSrc);
          console.log(e.loaded, e.total);
          //   this.loadImgProgress = 100 / 50;

          setProgress.call(e, this);
        };

        reader.readAsDataURL(file[i]);
        // Закоментил для теста ниже
        // this.addState.images[i] = file[i];



        // Это для теста, можно удалить
        this.imageArr.push(file[i]);
        file[i].id = this.imageArr.length;

        this.addState.images = this.imageArr;

        /* eslint-disable no-console */
        console.log(this.imageArr);
        /* eslint-disable no-console */
      }

      function setProgress($this) {
        var complete = this.loaded / this.total;
        $this.loadImgProgress = Math.floor(complete * 100);
      }
    },
    bodyClick(e) {
      //   let categories = document.getElementsByClassName("px-dd-categories");

      let items = document.querySelectorAll(
        ".dropdown-menu .dropdown-content a"
      );

      items.forEach(el => {
        el.addEventListener("click", findItem.call(this, event));
      });

      /* eslint-disable no-console */
      //   console.log(res);

      function findItem(event) {
        let id = event.target.dataset.catid;
        for (let key in this.categories) {
          if (key === id) {
            this.addState.currentCategory = this.categories[key];
            if (this.addState.currentCategory) {
              this.validator.category.field = true;
            }
          }
        }
        //
        let links = document.querySelectorAll(
          ".dropdown-menu .dropdown-content a"
        );
        links.forEach(el => {
          el.classList.remove("is-active");
        });
        event.target.classList.add("is-active");
      }
    },
    categoriesClick() {
      this.bodyState.categoriesDropDown = !this.bodyState.categoriesDropDown;
    }
  },
  mounted: function() {
    this.$store.dispatch("loadCategories").then(() => {
      this.categories = this.$store.getters.getCategories[0];
    });
  },
  computed: {}
};
</script>

<style scoped>
/* Fixes of Bulma */
.field.has-addons.has-addons-centered {
  justify-content: flex-start;
}
.tag {
  cursor: pointer;
}
.columns.is-mobile > .column.is-3 {
  display: flex;
  align-items: center;
}

.px-tag-fix {
  margin-right: 10px;
  margin-bottom: 5px;
}

.px-column {
  background: rgba(50, 115, 220, 0.14);
  margin: 20px 0px;
  border-radius: 5px;
}
.px-colors {
  margin-right: 5px;
}
/* Colors */
.is-black {
  background-color: #0a0a0a;
  color: #fff;
}
.is-dark {
  background-color: #363636;
  color: #fff;
}

.is-light {
  background-color: #f5f5f5;
  color: #0a0a0a;
}
.is-white {
  background-color: #fff;
  color: #0a0a0a;
}

.is-lightgreen {
  background-color: #d7ffce;
  color: #0a0a0a;
}
.is-green {
  background-color: #3cdf4b;
  color: #fff;
}
.is-palegreen {
  background-color: #4feb5d;
  color: #fff;
}
.is-forestgreen {
  background-color: #2b9b35;
  color: #fff;
}

.is-gold {
  background-color: #e4c100;
  color: #0a0a0a;
}
.is-yellow {
  background-color: #f6df38;
  color: #0a0a0a;
}
.is-orange {
  background-color: #ff9c16;
  color: #fff;
}

.is-lightred {
  background-color: #ffcece;
  color: #0a0a0a;
}
.is-coral {
  background-color: #ff6060;
  color: #fff;
}
.is-red {
  background-color: #ff5048;
  color: #fff;
}
.is-carmine {
  background-color: #da352d;
  color: #fff;
}
.is-maroon {
  background-color: #ad2620;
  color: #fff;
}

.is-blue {
  background-color: #5aaaff;
  color: #fff;
}
.is-skyblue {
  background-color: #5ac8ff;
  color: #fff;
}
.is-ultramarine {
  background-color: #3b50ff;
  color: #fff;
}
</style>
