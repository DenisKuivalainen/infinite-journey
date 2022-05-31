import cron from "node-cron"
import game from "../lib/updateGame";

cron.schedule('*/1 * * * *', () => {
    game.updateGame();
  });