import router from "next/router";

const notAuth = () => {
  setTimeout(() => {
    router.replace("/LoginAndRegister");
  }, 500);
};

export { notAuth };
