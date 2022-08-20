export class Utils {
  public static ConvertGraphStringToList(graphString: string) {
    const graph: string[][] = [];

    graphString.split('#').forEach((row) => {
      graph.push(row.split(''));
    });

    return graph;
  }
}
