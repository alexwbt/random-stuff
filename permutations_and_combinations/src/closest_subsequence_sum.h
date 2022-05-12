#pragma once

#include <vector>

namespace closest_subsequence_sum
{
    // Finds minimum difference of the sum of any subsequence with brute force
    int min_subsequence_sum_diff(std::vector<int>& nums, int goal) {
        int min_diff = abs(goal);

        // loop for all subsequence of any length
        for (int x = 0; x < pow(2, nums.size()) - 1; x++)
        {
            int sum = 0;
            int count = 0;
            for (int i = 0; i < nums.size(); i++)
            {
                if ((x & (1 << i)) != 0)
                {
                    sum += nums[i];
                    count++;
                }
            }

            // get difference
            int diff = abs(sum - goal);

            if (diff == 0)
                return diff;

            if (diff < min_diff)
                min_diff = diff;
        }

        return min_diff;
    }
}
