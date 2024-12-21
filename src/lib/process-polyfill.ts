if (typeof window !== "undefined" && !window.process) {
  window.process = {
    env: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
  } as any;
}
