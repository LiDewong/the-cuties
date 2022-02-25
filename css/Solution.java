import java.util.Scanner;
class Solution {
    public static void moveZeroes(int[] nums) {
        int last=nums.length-1;
        int z;
        for(int count=0;count<nums.length;count++){
            
            if (nums[0]==0){
                count=0;
                 z=0;}
            else
                z=count;
            if (nums[z]==0){
                for(int i = count; i<last; i++) {
                    nums[i] = nums[i+1]; 
                }
            nums[last]=0;
            }
        }
        for(int p =0; p<nums.length;p++)
        System.out.print(nums[p]);
    }
    public static void main (String args[]){
        Scanner s = new Scanner(System.in);
        int []nums;     
        String[] string;
        String str ;
        str=s.next();
        // calling replaceAll() method and split() method on string
        string = str.replaceAll("\\[", "")
                              .replaceAll("]", "")
                              .split(",");
         // declaring an array with the size of string
        nums = new int[string.length];
        // parsing the String argument as a signed decimal integer object and storing that integer into the array
        for (int i = 0; i < string.length; i++) {
            nums[i] = Integer.valueOf(string[i]);
        }
        moveZeroes(nums); 
    }
}