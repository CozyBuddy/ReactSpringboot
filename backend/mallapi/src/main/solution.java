
import java.util.ArrayList;
class Solution {
    public int solution(int n, String[] data) {
         String[] al = {"A", "C", "F", "J","M", "N", "R", "T"} ;
                ArrayList<String> al2 = new ArrayList<>();
                int answer = 0;
                for(int i = 0; i < al.length; i++) {
                   al2.add(al[i]);
                   for (int j = i; j < al.length; j++) {
                      al2.add(al[j]);
                      for (int k = j; k < al.length; k++) {
                        al2.add(al[k]);
                        for (int l = k; l < al.length; l++) {
                            al2.add(al[l]);
                            for (int m = l; m < al.length; m++) {
                                al2.add(al[m]);
                                for (int p = m; p < al.length;p++) {
                                    al2.add(al[p]);
                                    for (int o = p; o < al.length; o++) {
                                        al2.add(al[o]);
                                        for (int q = o; q < al.length; q++) {
                                            al2.add(al[q]);
                                            for (int r = 0; r < n; r++) {
                                                if ( data[r].substring(3,4).equals(">")){
                                                    if (Math.abs(al2.indexOf(data[r].substring(0,1)) - al2.indexOf(data[r].substring(2,3)) )> Integer.parseInt(data[r].substring(4,5))+1 ) {
                                                        answer +=2;
                                                    } 
                                                } else if (data[r].substring(3,4).equals("=")){
                                                    if (Math.abs(al2.indexOf(data[r].substring(0,1)) - al2.indexOf(data[r].substring(2,3))) == Integer.parseInt(data[r].substring(4,5))+1){
                                                        answer+=2;
                                                    }
                                                } else if (data[r].substring(3,4).equals("<")) {
                                                    if (Math.abs(al2.indexOf(data[r].substring(0,1)) - al2.indexOf(data[r].substring(2,3))) < Integer.parseInt(data[r].substring(4,5))+1){
                                                        answer +=2;
                                                    }
                                                }
                                            }
                                                
                                            
                                        }
                                    }
                                }
                            }
                        }
                      }
                   }
                 }
                
                return answer ;
    }
}