import { loadConfig, baseEnvSchema } from "./config.js";
import { createLogger } from "./logger.js";
import { createDiscordClient, registerCommands } from "./client.js";
import { dispatchCommand } from "./dispatch.js";
import { loadModules, CoreContext, BotModule } from "./module.js";
import { safeEventHandler } from "./events.js";
import dcEmbedModule from "./modules/dcEmbed.js";
import igEmbedModule from "./modules/igEmbed.js";

const config = loadConfig(baseEnvSchema);
const logger = createLogger({ name: "cardsmith", level: config.LOG_LEVEL });
const { client, rest } = createDiscordClient(config);

const context: CoreContext = {
  config,
  logger,
  cache: new Map(),
  client,
  rest,
  staticCommands: [],
};

const modules: BotModule[] = [dcEmbedModule, igEmbedModule];

async function bootstrap() {
  logger.info("Starting cardsmith bot");

  const commands = loadModules(modules, context);
  context.staticCommands = commands;
  await registerCommands(commands.map((cmd) => cmd.data), rest, config, logger);

  client.on("interactionCreate", safeEventHandler(logger, "core:interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()) {
      await dispatchCommand(interaction, commands, context);
    }
  }));

  client.once("ready", () => {
    logger.info({ tag: client.user?.tag }, "Bot is ready");
  });

  await client.login(config.DISCORD_TOKEN);
}

bootstrap().catch((err) => {
  logger.error({ err }, "Failed to start bot");
  process.exit(1);
});
