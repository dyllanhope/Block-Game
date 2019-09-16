<template>
  <div class="hello" @keydown="move">
    <canvas ref="game" width="1000" height="1000"></canvas>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "BlockGame",
  data() {
    return {
      socket: {},
      context: {},
      position: {
        x: 0,
        y: 0
      },
      user: ""
    };
  },
  created() {
    this.socket = io("http://localhost:3000");
    this.socket.emit("player");
    socket.on("connect", function() {
      var id = socket.io.engine.id;
      alert(id);
    });
    this.socket.on("playerCount", data => {
      localStorage["user"] = data;
    });
  },
  mounted() {
    document.addEventListener("keydown", this.move);
    this.context = this.$refs.game.getContext("2d");
    this.socket.on("position", data => {
      this.position = data;
      this.context.clearRect(
        0,
        0,
        this.$refs.game.width,
        this.$refs.game.height
      );
      this.context.fillRect(this.position.x, this.position.y, 20, 20);
    });
  },
  methods: {
    move() {
      console.log(event.key);
      let code = event.key;
      switch (code) {
        case "ArrowRight":
          this.socket.emit("move", "right");
          break;
        case "ArrowUp":
          this.socket.emit("move", "up");
          break;
        case "ArrowLeft":
          this.socket.emit("move", "left");
          break;
        case "ArrowDown":
          this.socket.emit("move", "down");
          break;
      }
    }
  }
};
</script>

<style scoped>
</style>
