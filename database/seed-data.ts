interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pending :Here you can find pendings tickets ",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "In-Progress :Here you cand find tickets in progress",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Finished :Here you cand find tickets finishes",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
