export function formatTimestamp(
  createdTimestamp: number | null,
  updatedTimestamp: number | null,
): string {
  const before = updatedTimestamp ? "Updated on" : "Created on";
  const timestamp = updatedTimestamp || createdTimestamp;

  const date = new Date(Number(timestamp));

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${before} ${day} ${month} ${year} at ${hours}:${minutes}`;
}
