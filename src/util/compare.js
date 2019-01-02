const collattor = new Intl.Collator(undefined, {numeric: true, sensitivity: "base"})
export default (string1,string2) => (collattor.compare(string1,string2));