public class programmer {

        public int solution(int h1, int m1, int s1, int h2, int m2, int s2) {
           
            int second = 1 ;
            int result = 0 ;
            for (double i = h1; i < h2; i += 1.0 / 3600) {
                for (double j = m1; j < m2; j += 1.0 / 60) {
                    for (int k = s1; k < s2; k++) {
                        if ((int) Math.ceil(i) == k) {
                            result++;
                        }
                        if ((int) Math.ceil(j) == k) {
                            result++;
                        }
                    }
                }
            }
                 return result;
        }
    
}
