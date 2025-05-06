import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";

worker({
  async init() {
    // idb since we want persistence
    return new PGlite("idb://health-db");
  },
});
