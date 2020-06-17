class UI {
  render(context) {
    context.fillStyle = "rgba(255, 0, 0, 1)";
    context.fillRect(8, 4, 70, 8);

    context.fillStyle = "rgba(0, 255, 0, 1)";
    context.fillRect(8, 4, (player.life / player.maxLife) * 70, 8);

    context.fillStyle = "#fff";
    context.font = "6px Arial";
    context.fillText(`${player.life}/${player.maxLife}`, 32, 10);
  }
}