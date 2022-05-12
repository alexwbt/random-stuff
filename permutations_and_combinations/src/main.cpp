#include <iostream>

#include "unique_permutation.h"
#include "closest_subsequence_sum.h"

void run_unique_permutation()
{
    using namespace unique_permutation;

    // test input
    std::vector<int> numbers = { 1, 2, -10, -5, 6, 10 };

    // get result
    auto result = permute_unique(numbers);

    // output result
    for (auto& p : result)
    {
        std::cout << '[';
        for (auto i : p)
            std::cout << ' ' << i;
        std::cout << " ]" << std::endl;
    }
}

void run_closest_subsequence_sum()
{
    using namespace closest_subsequence_sum;

    //std::vector<int> nums = { 3346,-3402,-9729,7432,2475,6852,5960,-7497,3229,6713,8949,9156,3945,-8686,1528,5022,-9791,-3782,-191,-9820,7720,-6067,-83,6793,340,7793,8742,8067 };
    //int goal = -20357;
    std::vector<int> nums = { 8116,-2363,1327,-2435,-2831,5060,-505,-9296,3637 };
    int goal = -592300806;
    //std::vector<int> nums = { -7933,-1642,-6137,6234,4728,5474,2439 };
    //int goal = -428059487;
    //std::vector<int> nums = { 3530, -1549, 6835, -587, 3787, -1033, 4205, 1006, 5918, -2940, 6101, 3169, 3930, -7006, -7889, -5758, -3246, -5098, -2489, -9144, -6617, -1703, -4898, 5721, -6758, 3078, -3859, -9902, -7079, 4014, -8334, 8009 };
    //int goal = 842213514;
    std::cout << min_subsequence_sum_diff(nums, goal) << std::endl;
}

int main()
{
    run_unique_permutation();
    run_closest_subsequence_sum();
}

