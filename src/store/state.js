export default {
  isCollapse: false,
  isTopCollapse: false,
  menuActive: "",
  portraitList: [
    {
      name: "头像01",
      url: '/static/portrait/avatar01.png'
    },
    {
      name: "头像02",
      url: "/static/portrait/avatar02.png"
    },
    {
      name: "头像03",
      url: "/static/portrait/avatar03.png"
    },
    {
      name: "头像04",
      url: "/static/portrait/avatar04.png"
    },
    {
      name: "头像05",
      url: "/static/portrait/avatar05.png"
    },
    {
      name: "头像06",
      url: "/static/portrait/avatar06.png"
    },
    {
      name: "头像07",
      url: "/static/portrait/avatar07.png"
    },
    {
      name: "头像08",
      url: "/static/portrait/avatar08.png"
    },
    {
      name: "头像09",
      url: "/static/portrait/avatar09.png"
    },
    {
      name: "头像10",
      url: "/static/portrait/avatar10.png"
    },
    {
      name: "头像11",
      url: "/static/portrait/avatar11.png"
    },
    {
      name: "头像12",
      url: "/static/portrait/avatar12.png"
    },
    {
      name: "头像13",
      url: "/static/portrait/avatar13.png"
    },
    {
      name: "头像14",
      url: "/static/portrait/avatar14.png"
    },
    {
      name: "头像15",
      url: "/static/portrait/avatar15.png"
    },
    {
      name: "头像16",
      url: "/static/portrait/avatar16.png"
    },
    {
      name: "头像17",
      url: "/static/portrait/avatar17.png"
    },
    {
      name: "头18",
      url: "/static/portrait/avatar18.png"
    },
    {
      name: "头像19",
      url: "/static/portrait/avatar19.png"
    },
    {
      name: "头像20",
      url: "/static/portrait/avatar20.png"
    },
    {
      name: "头像21",
      url: "/static/portrait/avatar21.png"
    },
    {
      name: "头像22",
      url: "/static/portrait/avatar22.png"
    },
    {
      name: "头像23",
      url: "/static/portrait/avatar23.png"
    },
    {
      name: "头像24",
      url: "/static/portrait/avatar24.png"
    },
    {
      name: "头像25",
      url: "/static/portrait/avatar25.png"
    },
    {
      name: "头像26",
      url: "/static/portrait/avatar26.png"
    },
    {
      name: "头像27",
      url: "/static/portrait/avatar27.png"
    },
    {
      name: "头像28",
      url: "/static/portrait/avatar28.png"
    },
    {
      name: "头像29",
      url: "/static/portrait/avatar29.png"
    },
    {
      name: "头像30",
      url: "/static/portrait/avatar30.png"
    },
    {
      name: "头像31",
      url: "/static/portrait/avatar31.png"
    }
  ],
  get token() {
    return localStorage.getItem("USER_TOKEN");
  },
  set token(value) {
    localStorage.setItem("USER_TOKEN", value);
  },
  get userInfo() {
    return JSON.parse(localStorage.getItem("USER_INFO"));
  },
  set userInfo(data) {
    localStorage.setItem("USER_INFO", JSON.stringify(data));
  }
};
