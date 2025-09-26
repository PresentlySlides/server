import chalk from "chalk";

class Logger {
    constructor(channel) {
        this.channel = channel;
        this.messages = 0;
    }

    raw(message, level) {
        const now = new Date();
        const timeString =
            now.toLocaleTimeString("en-US", {hour12: false}) +
            "." +
            now.getMilliseconds().toString().padStart(3, "0");

        process.stdout.write(
            `${chalk.gray("[")}${chalk.yellow(this.channel)}${chalk.yellow("/")}${chalk.yellow(
                this.messages.toString().padStart(4, "0")
            )} ${chalk.cyan.italic(timeString)} ${level}${chalk.gray("]")}  ${chalk.reset(
                message
            )}\n`
        );

        this.messages++;
    }

    log(message = "", level = chalk.white.bold("NONE")) {
        message.split("\n").forEach(line => this.raw(line, level));
    }

    debug(message) {
        this.log(message, chalk.blue.bold("DBUG"));
    }
    info(message) {
        this.log(message, chalk.green.bold("INFO"));
    }
    warn(message) {
        this.log(chalk.bold(message), chalk.bgYellow.bold("WARN"));
    }
    error(message) {
        this.log(chalk.red(message), chalk.red.bold("EROR"));
    }
    fatal(message) {
        this.log(chalk.bgRed.bold(message), chalk.bgRed.bold("FATL"));
    }

    blank(amount = 1) {
        process.stdout.write("\n".repeat(amount));
    }
}

export default Logger;
