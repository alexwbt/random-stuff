#pragma once

#include <vector>

namespace unique_permutation
{
    // basically the same with std::next_permutation
    void next_permutation(std::vector<int>& v)
    {
        int n = v.size();
        if (n <= 1)
            return;

        // find rightmost element smaller than successor
        int breakPoint = -1;
        for (int i = n - 2; i >= 0; i--)
        {
            if (v[i] < v[i + 1])
            {
                breakPoint = i;
                break;
            }
        }

        // pure descending, flip all
        if (breakPoint == -1)
        {
            std::reverse(v.begin(), v.end());
            return;
        }

        // swap with rightmost element that's smaller, flip suffix
        for (int i = n - 1; i >= 0; i--)
        {
            if (v[i] > v[breakPoint])
            {
                std::swap(v[i], v[breakPoint]);
                break;
            }
        }
        std::reverse(v.begin() + breakPoint + 1, v.end());
    }

    // Finds all unqiue permutations of a given int vector
    std::vector<std::vector<int>> permute_unique(std::vector<int>& numbers) {
        std::vector<std::vector<int>> result;
        std::vector<int> temp(numbers);

        do
        {
            result.push_back(temp);
            next_permutation(temp);
        } while (temp != numbers);

        return result;
    }
}
