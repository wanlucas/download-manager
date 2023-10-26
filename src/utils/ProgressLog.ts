import CliProgress from "cli-progress";

class ProgressLog extends CliProgress.SingleBar {
  constructor() {
    super(
      {
        format:
          'Baixando arquivo: [{bar}] {percentage}% || {value} Mb/{total} Mb',
        hideCursor: true,
      },
      CliProgress.Presets.shades_classic,
    );
  }

  start(totalLength: number, startValue: number) {
    super.start(totalLength, startValue);
  }
}

export default ProgressLog;